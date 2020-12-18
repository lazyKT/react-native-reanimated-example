import React, { useState, useEffect } from 'react';
import { 
    StyleSheet,
    View,
    Dimensions,
    Text
} from 'react-native';
import Animated from 'react-native-reanimated';
import { TapGestureHandler, PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window'); 
const { Value } = Animated;


const BottomSheet = ({ 
    translateY,
    gestureHandler, 
    sheetOpacity,
    contentOpacity,
    isExpand
}) => {

    return (
        <>
            {/* <TapGestureHandler { ...gestureHandler }>
                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFill,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        zIndex: -1,
                        opacity: sheetOpacity
                    }}
                />
            </TapGestureHandler> */}
            <PanGestureHandler { ...gestureHandler}>
                <Animated.View
                    style={{ 
                        ...styles.bottomSheet,
                        transform: [{translateY : translateY}]
                    }}
                >

                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: 0,
                            opacity: sheetOpacity
                        }}
                    >
                        <CustomButton
                            gestureHandler={gestureHandler}
                            buttonText='Open Sheet'
                        />
                        <Text>Bottom Sheet</Text>
                    </Animated.View>


                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: 0,
                            opacity: contentOpacity
                        }}
                    >
                        <CustomButton
                            gestureHandler={gestureHandler}
                            buttonText='Close Sheet'
                        />
                    </Animated.View>

                    
                    <Animated.View
                        style={{
                            ...styles.bottomSheetContent,
                            opacity: contentOpacity
                        }}
                    >
                        <Text>Sheet Content</Text>
                    </Animated.View>

                </Animated.View>
            </PanGestureHandler>
        </>
    )
}

const CustomButton = ({ gestureHandler, buttonText }) => {

    return(
      <TapGestureHandler {...gestureHandler} >
        <Animated.View>
          <TouchableOpacity>
            <Text style={{ ...styles.btnText }}>{buttonText}</Text>
          </TouchableOpacity>
        </Animated.View>
      </TapGestureHandler>
    )
  }

// styling
const styles = StyleSheet.create({
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        width,
        height: height,
        padding: 20,
        alignItems: 'center',
        zIndex: 999,
        borderWidth: 0.6,
        borderTopColor: 'gainsboro'
    },
    bottomSheetContent: {
        marginTop: 30,
        width: width - 50,
        height: width - 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'tomato',
        borderRadius: 10
    },
    btnText: {
      fontSize: 17,
      fontWeight: '500',
      color: 'blue'
    }
})


export default BottomSheet;