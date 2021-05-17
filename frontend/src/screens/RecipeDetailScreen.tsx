import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { DataTable, Chip } from 'react-native-paper';
import { images } from '../common/images';
import { theme } from '../common/theme';
import { fonts } from '../common/fonts';
import { useScrollToTop } from '@react-navigation/native';

const RecipeDetailScreen = ({ route, navigation }) => {
  var { recipe } = route.params;
  const [parts, setResult] = useState<Array<string>>([]);
  const [manuals, setManual] = useState<Array<string>>([]);
  const ref = React.useRef(null);
  useScrollToTop(
    React.useRef({
      scrollToTop: () => ref.current?.scrollToOffset({ offset: -100 }),
    })
  );

  const addPart = () => {
    var a = JSON.stringify(recipe);
    var b = JSON.parse(a);
    var temp = [];
    for (var i = 0; i < 9; i++) {
      if (b['part0' + (i + 1)] != 'null') {
        temp[i] = b['part0' + (i + 1)];
      }
    }
    for (var i = 9; i < 30; i++) {
      if (b['part' + (i + 1)] != 'null') {
        temp[i] = b['part' + (i + 1)];
      }
    }
    setResult(temp);
  };

  const addManual = () => {
    var a = JSON.stringify(recipe);
    var b = JSON.parse(a);
    var temp = [];
    for (var i = 0; i < 9; i++) {
      if (b['manual0' + (i + 1)] != 'null') {
        temp[i] = b['manual0' + (i + 1)];
      }
    }
    for (var i = 9; i < 15; i++) {
      if (b['manual' + (i + 1)] != 'null') {
        temp[i] = b['manual' + (i + 1)];
      }
    }
    setManual(temp);
  };

  useEffect(() => {
    if (recipe.length != 0) {
      addPart();
      addManual();
    }
  }, [recipe]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.img }} style={styles.recipeImg} />
      <View style={styles.recipeContent}>
        <View style={styles.iconImg}>
          <Image source={images.chef} />
        </View>
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        <ScrollView ref={ref} style={styles.scrollContainer}>
          <View style={styles.scrollContent}>
            <Text style={styles.partTitle}>재료</Text>
            <View style={styles.partList}>
              {parts.map((part, index) => (
                <Chip key={index} style={styles.partChip}>
                  <Text style={styles.partText}>{part}</Text>
                </Chip>
              ))}
            </View>
            <View style={styles.bar}></View>
            <Text style={styles.energyTitle}>영양 정보</Text>
            <DataTable style={styles.energyTable}>
              <DataTable.Header>
                <DataTable.Title style={styles.energyTableContent}>
                  <Text style={styles.energyHead}>열량</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.energyTableContent}>
                  <Text style={styles.energyHead}>탄수화물</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.energyTableContent}>
                  <Text style={styles.energyHead}>단백질</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.energyTableContent}>
                  <Text style={styles.energyHead}>지방</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.energyTableContent}>
                  <Text style={styles.energyHead}>나트륨</Text>
                </DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell style={styles.energyTableContent}>
                  {recipe.eng}
                </DataTable.Cell>
                <DataTable.Cell style={styles.energyTableContent}>
                  {recipe.car}
                </DataTable.Cell>
                <DataTable.Cell style={styles.energyTableContent}>
                  {recipe.pro}
                </DataTable.Cell>
                <DataTable.Cell style={styles.energyTableContent}>
                  {recipe.fat}
                </DataTable.Cell>
                <DataTable.Cell style={styles.energyTableContent}>
                  {recipe.nat}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
            <View style={styles.bar}></View>
            <Text style={styles.manualTitle}>만드는 법</Text>
            <View style={styles.manualContainer}>
              {manuals.map((manual, index) => (
                <Text style={styles.manualContent} key={index}>
                  {manual}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    flexDirection: 'column',
  },
  bar: {
    backgroundColor: '#BACDE6',
    width: '95%',
    height: 0.45,
    marginTop: 10,
  },
  recipeImg: {
    flex: 3,
    width: '100%',
  },
  recipeContent: {
    flex: 5,
    alignItems: 'center',
    top: -55,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    top: 30,
    flexDirection: 'column',
  },
  scrollContent: {
    flex: 1,
    alignItems: 'center',
  },
  iconImg: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  recipeTitle: {
    fontSize: 20,
    color: '#0C276F',
  },
  partTitle: {
    fontFamily: fonts.RIDI,
    fontSize: 18,
    marginBottom: 10,
  },
  partList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '93%',
    alignContent: 'flex-start',
    justifyContent: 'center',
  },
  partChip: {
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: '#606DCA',
  },
  partText: {
    fontFamily: fonts.RIDI,
    fontSize: 12,
  },
  energyTitle: {
    fontFamily: fonts.RIDI,
    fontSize: 18,
    marginTop: 10,
  },
  energyTable: {
    width: '85%',
    borderColor: '#BACDE6',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  energyTableContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  energyHead: {
    fontSize: 14,
    fontWeight: '200',
  },
  manualTitle: {
    fontSize: 18,
    fontFamily: fonts.RIDI,
    marginTop: 15,
  },
  manualContainer: {
    alignItems: 'flex-start',
    width: '85%',
    marginTop: 15,
  },
  manualContent: {
    fontSize: 15,
    fontFamily: fonts.RIDI,
    marginBottom: 15,
    lineHeight: 25,
  },
});
export default RecipeDetailScreen;
