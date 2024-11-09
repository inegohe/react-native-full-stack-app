import {
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { ExpandingDot } from "react-native-animated-pagination-dots";

import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{
            //uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
            uri: 'https://player.vimeo.com/video/949616422?h=d60220d68d'
          }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-48 h-72 rounded-[20px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  const scrollX = React.useRef( new Animated.Value(0)).current;

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <>
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        {
          useNativeDriver: false,
        }
      )}
      pagingEnabled
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 200 }}
      horizontal
      decelerationRate={'normal'}
      scrollEventThrottle={16}
      contentContainerStyle={{
        paddingStart: 80,
        paddingEnd: 80
      }}
      />

      <ExpandingDot 
      data={posts}
      expandingDotWidth={30}
      scrollX={scrollX}
      inActiveDotOpacity={0.6}
      activeDotColor='#ff9001'
      dotStyle={{
        width: 10,
        height: 10,
        backgroundColor: '#ff9001',
        borderRadius: 5,
        marginHorizontal: 5
      }}
      containerStyle={{
        top: 400,
      }}
      />
      </>
  );
};

export default Trending;
