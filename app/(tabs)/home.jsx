import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalProvider'

const Home = () => {
  const { isLoggedIn } = useContext(GlobalContext);
  console.log(isLoggedIn);
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home