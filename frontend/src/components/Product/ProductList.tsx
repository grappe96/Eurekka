import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { List } from 'react-native-paper';
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import { images } from '../../common/images';
import { theme } from '../../common/theme';
const _swipeableRow = Swipeable;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  text: {
    color: '#4a4a4a',
    fontSize: 15,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e4e4e4',
    marginLeft: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    width: 192,
  },
  restaurant: {
    backgroundColor: '#6D86DF',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  trash: {
    backgroundColor: '#FB5C6F',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  restaurantImg: {
    width: 40,
    height: 40,
  },
  trashImg: {
    width: 40,
    height: 40,
  },
});

export const Separator = () => <View style={styles.separator} />;

const RightActions = ({ progress, dragX, onPressEat, onPressAbandon }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.btnContainer}>
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton style={styles.restaurant} onPress={onPressEat}>
          <Image source={images.restaurant} style={styles.restaurantImg} />
        </RectButton>
      </Animated.View>
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton style={styles.trash} onPress={onPressAbandon}>
          <Image source={images.trash} style={styles.trashImg} />
        </RectButton>
      </Animated.View>
    </View>
  );
};

const ProductList = ({ id, category, dday, name, onEatPress, onAbandonPress }) => {
  var img;
  switch (category) {
    case 0:
      img = images.noodles;
      break;
    case 1:
      img = images.snack;
      break;
    case 2:
      img = images.beverage;
      break;
    case 3:
      img = images.pickles;
      break;
    case 4:
      img = images.diary;
      break;
    case 5:
      img = images.health;
      break;
    case 6:
      img = images.powder;
      break;
    case 7:
      img = images.meat;
      break;
    case 8:
      img = images.seasoning;
      break;
    case 9:
      img = images.ocean;
      break;
    case 10:
      img = images.fresh;
      break;
    case 11:
      img = images.alcohol;
      break;
    case 12:
      img = images.frozen;
      break;
    case 13:
      img = images.ices;
      break;
    case 14:
      img = images.others;
      break;
  }
  if (dday >= 0) {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) => (
          <RightActions
            progress={progress}
            dragX={dragX}
            onPressEat={onEatPress}
            onPressAbandon={onAbandonPress}
          />
        )}
      >
        <View style={styles.container}>
          <List.Item
            title={name}
            left={(props) => <Image source={img} style={{ width: 40, height: 40 }} />}
            right={(props) => <Text style={{ padding: 7 }}>D - {dday}</Text>}
          />
        </View>
      </Swipeable>
    );
  } else {
    const day = dday * -1;
    return (
      <Swipeable
        renderRightActions={(progress, dragX) => (
          <RightActions
            progress={progress}
            dragX={dragX}
            onPressEat={onEatPress}
            onPressAbandon={onAbandonPress}
          />
        )}
      >
        <View style={styles.container}>
          <List.Item
            title={name}
            left={(props) => <Image source={img} style={{ width: 40, height: 40 }} />}
            right={(props) => <Text style={{ padding: 7, color: '#FB5C6F' }}>{day}일 지남</Text>}
          />
        </View>
      </Swipeable>
    );
  }
};

export default ProductList;
