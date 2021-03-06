import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import data from '../tenses/data';
import { Transition, Transitioning } from 'react-native-reanimated';

const transitions = (
  <Transition.Together>
    <Transition.In type='fade' duration={200} />
    <Transition.Change />
    <Transition.Out type='fade' duration={200} />
  </Transition.Together>
);

export default function TensesScreen() {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();

  return (
    <Transitioning.View
      ref={ref}
      transitions={transitions}
      style={styles.container}
    >
      <StatusBar hidden />
      {data.map(({ bg, color, category, subCategories }, index) => {
        return (
          <TouchableOpacity
            key={category}
            onPress={() => {
              ref.current.animateNextTransition();
              setCurrentIndex(index === currentIndex ? null : index);
            }}
            style={styles.cardCon}
            activeOpacity={0.9}
          >
            <View style={[styles.card, { backgroundColor: bg }]}>
              <Text style={[styles.heading, { color }]}>{category}</Text>
              {index === currentIndex && (
                <View style={styles.subCategoriesList}>
                  {subCategories.map((subCategory) => (
                    <Text key={subCategory} style={[styles.body, { color }]}>
                      {subCategory}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cardCon: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  body: {
    fontSize: 15,
    lineHeight: 22 * 1.8,
    textAlign: 'left',
  },
  subCategoriesList: {
    marginTop: 20,
  },
  
});