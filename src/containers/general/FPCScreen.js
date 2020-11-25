import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCategoriesFirestore,
  getIngredientsFirestore,
  getProductsFirestore,
} from '../../actions/data.action';
import {loading} from '../../actions/ui.action';
import {CategoriesPicker} from '../../components/CategoriesPicker';
import {IngredientFlatList} from '../../components/IngredientsFlatList';
import {ItemIngredient} from '../../components/ItemIngredient';
import {Loading} from '../../components/Loading';
import {ProductsPicker} from '../../components/ProductsPicker';

export const FPCScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loading(true));
    dispatch(getProductsFirestore());
    dispatch(getCategoriesFirestore());
    dispatch(getIngredientsFirestore());
  }, []);
  const {ingredientsList} = useSelector((state) => state.data);
  const [search, setsearch] = useState('');
  const [data, setdata] = useState({
    category: '',
    product: '',
  });
  const [ingredients, setingredients] = useState([]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Loading />

        <Text style={styles.label}>Selección del producto</Text>
        <ProductsPicker onChange={setdata} value={data.product} />
        <CategoriesPicker onChange={setdata} value={data.category} />
        <View style={styles.separator}></View>
        <Text style={styles.label}>Selección de ingredientes</Text>
        <View style={styles.view}>
          <TextInput
            style={styles.text}
            onChangeText={(val) => setsearch(val.toLowerCase())}
            placeholder={'Buscar un ingrediente'}
          />
          <Icon name="search-outline" size={30} color="#003366" />
        </View>
        {ingredientsList.length > 0 ? (
          <View style={{height: 90, paddingHorizontal: 30}}>
            <FlatList
              data={ingredientsList}
              renderItem={({item}) =>
                item.name.toLowerCase().includes(search) && (
                  <IngredientFlatList
                    ingredient={item}
                    onPress={setingredients}
                  />
                )
              }
              keyExtractor={(item) => String(item.id)}
            />
          </View>
        ) : (
          <Text style={styles.msg}>No se han registrado ingredientes</Text>
        )}
        <View style={styles.separator}></View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.label}>Ingredientes seleccionados</Text>
          <TouchableOpacity onPress={() => setingredients([])}>
            <Icon
              name="refresh"
              size={30}
              color="#003366"
              style={{marginRight: 25}}
            />
          </TouchableOpacity>
        </View>
        {ingredients.length > 0 ? (
          <View style={{height: 90, paddingHorizontal: 30}}>
            <FlatList
              data={ingredients}
              renderItem={({item}) => (
                <Text style={{fontSize: 16}}>
                  {item.name}: {item.kg}kg{' '}
                </Text>
              )}
              keyExtractor={(item) => String(item.id)}
            />
          </View>
        ) : (
          <Text style={styles.msg}>No se han seleccionado ingredientes</Text>
        )}
      </View>
      <FAB
        label="Resultado"
        icon="page-next-outline"
        style={styles.fab}
        onPress={() => {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 5,
  },
  fab: {
    backgroundColor: '#003366',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    end: 0,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#000000',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '85%',
    margin: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 17,
    margin: 5,
    fontWeight: 'bold',
    paddingLeft: 15,
    color: '#003366',
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
    width: '80%',
    alignSelf: 'center',
  },
  text: {
    flexShrink: 1,
    width: '100%',
  },
  msg: {
    fontSize: 16,
    alignSelf: 'center',
    margin: 10,
  },
});
