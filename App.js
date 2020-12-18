import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import BottomSheet from './BottomSheet';
import Animated, { useCode, cond, eq, set, not, interpolate } from 'react-native-reanimated';
import { TouchableOpacity, TapGestureHandler, State } from 'react-native-gesture-handler';
import { withTransition } from 'react-native-redash/lib/module/v1';

const {
  Value,
  event
} = Animated;

const { height } = Dimensions.get('window');

export default function App(){

  // let translateY = new Value(200);
  // define animation State (start, end, etc ..)
  const state = new Value(State.UNDETERMINED);
  const swipeY = new Value(0);
  const isExpand = new Value(0);
  const transition = withTransition(isExpand); // something like interpolation

  let translateY = interpolate(transition, {
    // if isExpand is 0, then translateY is 200. Else, transalteY is 0
    inputRange: [ 0, 1], 
    outputRange: [ height - 100, 50],
  });

  let sheetOpacity = interpolate(translateY, {
    // if translateY is 0, then opacity will be 1, ELSE, opacity is 0
    inputRange: [ 50, 100 , height - 100],
    outputRange: [ 0, 0, 1]
  });

  let contentOpacity = interpolate(translateY, {
    inputRange: [ 50, 100, height - 100 ],
    outputRange: [ 1, 1, 0 ]
  })

  // pan responder on bottom sheet
  const onGestureEvent = Animated.event([
    {
      nativeEvent: {
        translationY: swipeY,
        state: state
      }
    },
  ]);

  // capture the User gestures
  // tap(touch), pinch, swipe, etc ..
  // in this case, this will handle user tap(touch) gesture
  // const gestureHandler = event([
  //   {
  //     nativeEvent: { state: state }
  //   },
  // ]);

  // // useCode is triggered when there is an input changes in the component
  // // in this case, this 'useCode' will be triggered when the tapGestureHandler changes
  // // It works like something (a button tap or input changes in RN thread) in Native UI Thread
  // // fires an action when something is triggered (simplified)
  // // as reanimated runs in Native UI Thread (Not in JS React Native Thread)
  // // the codes that implement reanimated animations are not JS
  // // we cannot use JS in Native UI Thread also. 
  // // Working with two threads like this, prevents blocking states on Animations
  // useCode( () => {
  //   console.log('Triggering!!!');
  //   // must not use normal JS code
  //   // I also don't know what kind of codes I'm writing here, in this block
  //   // cond is imported from Reanimated and works like if-else
  //   cond(
  //     // the below is an conditional state, eq means equal operator. (We can also use other operators)
  //     eq(state, State.END), // if the state value is equal to State.END
  //     [
  //       // this block will be executed if the condition(s) are met,
  //       // another conditional statement (nested if)
  //       cond(
  //         eq(translateY, 200), // if translateY === 300
  //         set(translateY, 0), // then translateY === 0
  //         set(translateY, 200) // else translateY === 300
  //       )
  //     ],
  //     [
  //       // else, this block will be executed
  //     ]
  //   )
  // })

  // how am I supposed to comment inside this block?
  // refet to the top
  // in reality, write like below
  // a single mistake and you can't achieve anything
  // every small thing counts
  // even the two curly braces
  // NOTE :: thie useCode also accepts deps array
  // you can think of this like useEffect, when any of deps change, it will be triggered
  // COOL:)
  useCode(() => 
    cond(
      eq(state, State.END),
      set(isExpand, not(isExpand)) // is exapnd then collapse & vice versa
    ),
    [ isExpand, state ] // Yay! Deps :D
  );

  // // stress test
  // useEffect( () => {
  //   let interval = setInterval(intervalFunc, 1000);

  //   function intervalFunc() {
  //     console.log('JS Thread is working on something stupid!');
  //   }

  //   return () => clearInterval(interval);

  // }, []);

  return(
    <View style={styles.container}>
      
      <CustomButton
        gestureHandler={{
          onHandlerStateChange: Animated.event([
            {
              nativeEvent: { state },
            }
          ]),
        }}
      />
      
      <BottomSheet
        isExpand={isExpand}
        translateY={translateY}
        swipeY={swipeY}
        sheetOpacity={sheetOpacity}
        contentOpacity={contentOpacity}
        gestureHandler={{
          onHandlerStateChange: Animated.event([
            {
              nativeEvent: { state },
            }
          ])
        }}
        onGestureEvent={onGestureEvent}
      />

    </View>
  )
}


const CustomButton = ({ gestureHandler }) => {

  return(
    <TapGestureHandler {...gestureHandler} >
      <Animated.View>
        <TouchableOpacity>
          <Text style={{ ...styles.btnText }}>Show PopUp</Text>
        </TouchableOpacity>
      </Animated.View>
    </TapGestureHandler>
  )
}


// styling
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'blue'
  }
})
