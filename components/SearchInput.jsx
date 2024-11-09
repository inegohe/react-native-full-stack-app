import { View, Text, TextInput, Image, Alert } from 'react-native'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ initialQuery }) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '')

  return (
      <View className='border-2 rounded-2xl w-full h-16 px-4 bg-black-200 focus:border-secondary items-center flex-row space-x-4'>
        <TextInput 
        className='text-base mt-0.5 text-white flex-1 font-pregular'
        value={query}
        placeholder='Search for a video topic'
        placeholderTextColor='#cdcde0'
        onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity
        onPress={() => {
          if(!query) {
            Alert.alert('Missing query','Please input something to search reasults accross database')
          }

          if(pathname.startsWith('/search')) router.setParams({ query })
            else router.push(`/search/${query}`)
        }}
        >
            <Image
            source={icons.search}
            className='w-5 h-5'
            resizeMode='contain'
            />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput