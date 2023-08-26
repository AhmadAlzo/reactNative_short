import { LinearGradient } from 'expo-linear-gradient';
import { deg } from 'react-native-linear-gradient-degree';

<TouchableOpacity  onPress={handelPress}>
  <LinearGradient
    colors={[ "#C72FF8", appColors.blue]} 
    {...deg(90)}
    style={Styles.butt}>
      <View style={Styles.cercel2}></View>
      <View style={Styles.cercel3}></View>
    <Text>{data<3?"next":'get started'}</Text>
    <Entypo name="home" size={24} color="#008E97" />
  </LinearGradient>
</TouchableOpacity>
