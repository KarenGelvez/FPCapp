import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {loading, showModalRI} from '../../actions/ui.action';
import {getIngredientsFirestore} from '../../actions/data.action';
import {Loading} from '../../components/Loading';
import {FAB} from 'react-native-paper';
import {IngredientModal} from '../../components/IngredientModal';
import {ItemIngredient} from '../../components/ItemIngredient';

export const IngredientsScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loading(true));
    dispatch(getIngredientsFirestore());
  }, []);
  const {showModalRegIngr: show} = useSelector((state) => state.ui);
  const {ingredientsList} = useSelector((state) => state.data);
  const [search, setsearch] = useState('');
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Loading />
        <IngredientModal />
        <View style={styles.view}>
          <TextInput
            style={styles.text}
            onChangeText={(val) => setsearch(val.toLowerCase())}
            placeholder={'Buscar un producto'}
          />
          <Icon name="search-outline" size={30} color="#003366" />
        </View>
        <Text
          style={{
            fontSize: 17,
            margin: 3,
            fontWeight: 'bold',
            color: '#003366',
          }}>
          Ingredientes
        </Text>
        {ingredientsList.length > 0 ? (
          <>
            {ingredientsList.map((item) => {
              if (item.name.toLowerCase().includes(search)) {
                return <ItemIngredient ingredient={item} key={item.id} />;
              }
            })}
          </>
        ) : (
          <Text>Aún no hay ingredientes registrados</Text>
        )}
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => dispatch(showModalRI(!show))}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 5,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderColor: '#003366',
    borderWidth: 1,
    borderRadius: 40,
    margin: 5,
  },
  text: {
    flexShrink: 1,
    width: '100%',
  },
  fab: {
    backgroundColor: '#003366',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    end: 0,
  },
});
