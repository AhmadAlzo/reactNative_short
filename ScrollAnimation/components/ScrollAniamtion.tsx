import { View, StyleSheet, Animated} from 'react-native'
import React from 'react'
// import { LinearGradient } from 'expo-linear-gradient';
// import { deg } from 'react-native-linear-gradient-degree';
import { SCREEN_WIDTH } from "../../../data/contans"
import { appColors } from "../../../data/color"

const ITEM_SIZE = 250;
const SPACING = 20;

type ScrollAnimationProps = {
    data: any[],
    outputRange: number[]
}
const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ data, outputRange }) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    return (
        <Animated.FlatList
            data={data}
            horizontal={true}
            keyExtractor={(item) => item.userId}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}

            contentContainerStyle={[{ gap: 25, paddingHorizontal: 25 }, Styles.contentContainerStyle]}
            style={Styles.styleScroll}
            alwaysBounceHorizontal={true}
            renderItem={({ item, index }) => {
                let inputRange = [
                    ITEM_SIZE * (index) - SCREEN_WIDTH,
                    ITEM_SIZE * (index + 1) - SCREEN_WIDTH,

                    ITEM_SIZE * (index + 1) - SCREEN_WIDTH+(((ITEM_SIZE * index - SCREEN_WIDTH / 2 + ITEM_SIZE / 2) -(ITEM_SIZE * (index + 1) - SCREEN_WIDTH))/3 ),
                    ITEM_SIZE * (index + 1) - SCREEN_WIDTH+(((ITEM_SIZE * index - SCREEN_WIDTH / 2 + ITEM_SIZE / 2) -(ITEM_SIZE * (index + 1) - SCREEN_WIDTH))*2/3 ) ,

                    ITEM_SIZE * index - SCREEN_WIDTH / 2 + ITEM_SIZE / 2,

                    ITEM_SIZE * index - SCREEN_WIDTH / 2 + ITEM_SIZE / 2+(((ITEM_SIZE * index)-(ITEM_SIZE * index - SCREEN_WIDTH / 2 + ITEM_SIZE / 2))/3),
                    ITEM_SIZE * index - SCREEN_WIDTH / 2 + ITEM_SIZE / 2+(((ITEM_SIZE * index)-(ITEM_SIZE * index - SCREEN_WIDTH / 2 + ITEM_SIZE / 2))*2/3),

                    ITEM_SIZE * index,
                    ITEM_SIZE * (index + 1),
                ];
                inputRange = inputRange.map(e => Math.round(e + 25 * (index + 1))) 

                let out: number[] = []
                outputRange.forEach(e => {out.unshift(e)})
                // if (index == 1) {
                //     console.log(inputRange)
                // }
                const translateY = scrollX.interpolate({
                    inputRange,
                    outputRange: out,
                });
                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ["violet", "blue", "green", "orange", "red", "orange", "green", "blue", "violet"],
                });
                const rotateY = scrollX.interpolate({
                    inputRange,
                    outputRange: ["-90deg","-60deg","-40deg","-20deg","0deg","20deg","40deg","60deg","90deg"],
                });
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.4,0.5,0.8,0.9,1,0.9,0.8,0.5,0.4],
                });
                return (
                    < Animated.View
                        style={[Styles.ITEM, { transform: [{rotateY},{scale}] }]}
                    >
                        <View style={{width:60,height:30,backgroundColor:"red"}}>

                        </View>
                    </Animated.View>
                );
            }}
        />
    )
}
const Styles = StyleSheet.create({
    styleScroll: {
        backgroundColor: "blue",
        paddingVertical: 20
    },
    contentContainerStyle: {
        overflow: "hidden",
        height: ITEM_SIZE + 140,
        backgroundColor: "white",
        alignItems: "center",
    },
    ITEM: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        borderRadius: 100,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        // elevation: 20,
        shadowColor:"black",
        

        
    }
})
export default ScrollAnimation