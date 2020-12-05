// Inspiration: https://dribbble.com/shots/2343572-Countdown-timer
// 👉 Output of the code: https://twitter.com/mironcatalin/status/1321856493382238208

import * as React from 'react';
import {Animated, Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';

const {width, height} = Dimensions.get('window');
const colors = {
  black: '#323F4E',
  red: '#F76A6A',
  text: '#ffffff',
};

const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 100,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
          }}>
          <View
            style={styles.roundButton}
          />
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          top: height / 3,
          left: 0,
          right: 0,
          flex: 1,
        }}>
        <Animated.FlatList data={timers}
                           keyExtractor={item => item.toString()}
                           horizontal
                           showsHorizontalScrollIndication={false}
                           bounces={false}
                           contentContainerStyle={{
                             paddingHorizontal: ITEM_SPACING
                           }}
                           onScroll={Animated.event(
                             [{nativeEvent: {contentOffset: {x: scrollX}}}],
                             {useNativeDriver: true}
                           )}
                           snapToInterval={ITEM_SIZE}
                           decelerationRate="fast"
                           renderItem={({item, index}) => {
                             const inputRange = [
                               (index - 1) * ITEM_SIZE,
                               index * ITEM_SIZE,
                               (index + 1) * ITEM_SIZE
                             ]
                             return <View style={{width: ITEM_SIZE, justifyContent: 'center', alignItems: 'center'}}>
                               <Text style={[styles.text]}>
                                 {item}
                               </Text>
                             </View>
                           }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
  text: {
    fontSize: ITEM_SIZE * 0.8,
    fontFamily: 'Menlo',
    color: colors.text,
    fontWeight: '900',
  }
});
