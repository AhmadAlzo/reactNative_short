import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import ScrollAnimation from './components/ScrollAniamtion'

const ScrollAnimationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{height:350,backgroundColor:"white"}}>
        <ScrollAnimation data={[...Array(20).keys()].map((_,i)=>({userId:i}))} outputRange={[300,50,-20,-50,-80,-50,-20,50,300]}/>
      </View>
      
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1, 
        alignItems:"center",
        backgroundColor:"red",
        justifyContent:"center"    
    }
})
export default ScrollAnimationScreen   