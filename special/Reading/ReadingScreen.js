
import * as React from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
const { width } = Dimensions.get('screen');
import { EvilIcons } from '@expo/vector-icons';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';


const DATA = [
  {
    title: 'Tenses',
    location: 'Sri Lanka',
    date: 'Feb 18th, 2021',
    poster:
      'https://lessonsforenglish.com/wp-content/uploads/2020/10/12-Tenses-and-36-Example-Sentences.png',
  },
  {
    title: 'Conjunction',
    location: 'Sri Lanka',
    date: 'Feb 18th, 2021',
    poster:
      'https://englishgrammarhere.com/wp-content/uploads/2020/07/20-Sentences-of-Conjunction-Definition-and-Example-Sentences.png',
  },
   {
    title: 'Abbreviations',
    location: 'Sri Lanka',
    date: 'Feb 18th, 2021',
    poster:
      'https://englishgrammarhere.com/wp-content/uploads/2019/07/Internet-Abbreviations-1.png',
  },


 {
    title: 'Prepositions',
    location: 'Sri Lanka',
    date: 'Feb 18th, 2021',
    poster:
      'https://lessonsforenglish.com/wp-content/uploads/2020/06/80-Prepositions-List-and-Example-Sentences.png',
  },

  {
    title: 'Prepositional phrases',
    location: 'Sri Lanka',
    date: 'Feb 18th, 2021',
    poster:
      'https://englishgrammarhere.com/wp-content/uploads/2020/09/Prepositional-Phrases-List-and-Examples.png',
  },

  {
    title: 'Articles A & An',
    location: 'Sri Lanka',
    date: 'Feb 18th, 2021',
    poster:
      'https://i.pinimg.com/originals/1c/d8/54/1cd85446032b9de0d04894d28928c6c2.jpg',
  },
  {
    title: 'Modals',
    location: 'Sri Lanka',
    date: 'Feb 18th, 2021',
    poster:
      'https://lessonsforenglish.com/wp-content/uploads/2019/12/Modal-Verbs-of-Permission.png',
  },
  {
    title: 'Using HAVE in English',
    location: 'Berlin, Germany',
    date: 'Feb 18th, 2021',
    poster:
      'https://lessonsforenglish.com/wp-content/uploads/2020/05/Uses-HAVE-in-English-Positive-Negative-and-Question-Forms.png',
  },
  {
    title: "Using 'Tell'",
    location: 'Berlin, Germany',
    date: 'Feb 18th, 2021',
    poster:
      'https://lessonsforenglish.com/wp-content/uploads/2020/06/Collocations-with-TELL-and-Example-Sentences.png',
  },
   {
    title: "Using 'Time'",
    location: 'Berlin, Germany',
    date: 'Feb 18th, 2021',
    poster:
      'https://lessonsforenglish.com/wp-content/uploads/2020/06/Collocations-with-TIME-and-Example-Sentences.png',
  },
];

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  <EvilIcons
                    name='location'
                    size={16}
                    color='black'
                    style={{ marginRight: 5 }}
                  />
                  {item.location}
                </Text>
                <Text style={[styles.date]}>{item.date}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function ReadingScreen() {
  const [data, setData] = React.useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setData(newData);
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlingGestureHandler
      key='left'
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key='right'
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2,
              marginTop: 50,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: data.length - index }];
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [
                      {
                        translateX,
                      },
                      { scale },
                    ],
                  }}
                >
                  <Image
                    source={{ uri: item.poster }}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      borderRadius: 14,
                    }}
                  />
                </Animated.View>
              );
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
});