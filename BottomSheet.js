import React from 'react';
import { 
    StyleSheet,
    View,
    Dimensions,
    Text
} from 'react-native';
import Animated from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window'); 
const { Value } = Animated;


const BottomSheet = ({ translateY, gestureHandler, opacity }) => {


    return (
        <>
            <TapGestureHandler { ...gestureHandler }>
                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFill,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        opacity: opacity
                    }}
                />
            </TapGestureHandler>
            <Animated.View
                style={{ 
                    ...styles.bottomSheet,
                    transform: [{translateY : translateY}]
                }}
            >
                <Text>Bottom Sheet</Text>
            </Animated.View>
        </>
    )
}

// styling
const styles = StyleSheet.create({
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'red',
        width,
        height: 300,
        padding: 20,
        alignItems: 'center'
    }
})


export default BottomSheet;