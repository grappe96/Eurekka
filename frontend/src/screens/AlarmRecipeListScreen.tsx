import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native';
import { theme } from '../common/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipeList, { Separator } from '../components/Recipe/RecipeList';
const RecipeListScreen = ({ route, navigation }) => {
  type recipe = {
    seq: string;
    section: string;
    title: string;
    parts: string;
    eng: string;
    car: string;
    pro: string;
    fat: string;
    nat: string;
    img: string;
    percentage: number;
    part01: string;
    part02: string;
    part03: string;
    part04: string;
    part05: string;
    part06: string;
    part07: string;
    part08: string;
    part09: string;
    part10: string;
    part11: string;
    part12: string;
    part13: string;
    part14: string;
    part15: string;
    part16: string;
    part17: string;
    part18: string;
    part19: string;
    part20: string;
    part21: string;
    part22: string;
    part23: string;
    part24: string;
    part25: string;
    part26: string;
    part27: string;
    part28: string;
    part29: string;
    part30: string;
    manual01: string;
    manual02: string;
    manual03: string;
    manual04: string;
    manual05: string;
    manual06: string;
    manual07: string;
    manual08: string;
    manual09: string;
    manual10: string;
    manual11: string;
    manual12: string;
    manual13: string;
    manual14: string;
    manual15: string;
  };

  const [recipes, setRecipes] = useState<Array<recipe>>([]);

  const [refrigerId, setRefId] = useState<String>('');
  AsyncStorage.getItem('userInfo', (err, res) => {
    const user = JSON.parse(res);
    setRefId(user.refrigeratorId);
  });

  const { ingredient } = route.params;
  const getRecipes = async () => {
    axios
      .get(
        `http://eurekka.kr:8000/recipe/alarmRecipe/${refrigerId}&${ingredient}`
      )
      .then(({ data }) => {
        let tmp = [];
        for (const [key, value] of Object.entries(data)) {
          tmp.push(value);
        }
        setRecipes(tmp);
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  useEffect(() => {
    if (refrigerId.length != 0) {
      getRecipes();
    }
  }, [refrigerId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listItem}>
        <View style={styles.listHead}>
          <Text style={styles.title}>레시피</Text>
        </View>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.seq.toString()}
          renderItem={({ item }) => (
            <RecipeList
              {...item}
              onRecipePress={() =>
                navigation.navigate('RecipeDetail', {
                  recipe: item,
                })
              }
            />
          )}
          ItemSeparatorComponent={() => <Separator />}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  title: {
    fontSize: 20,
    color: '#E8EEF7',
  },
  listHead: {
    width: 370,
    height: 50,
    backgroundColor: '#09246D',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    marginTop: 20,
    marginBottom: 45,
    alignItems: 'center',
  },
  list: {
    width: 370,
  },
});
export default RecipeListScreen;
