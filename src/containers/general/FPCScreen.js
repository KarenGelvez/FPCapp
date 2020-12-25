import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
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
  getRequirementsFirestore,
  setSelectedData,
  setSelectedIngredients,
} from '../../actions/data.action';
import {loading, showModalRes} from '../../actions/ui.action';
import {CategoriesPicker} from '../../components/CategoriesPicker';
import {IngredientFlatList} from '../../components/IngredientsFlatList';
import {Loading} from '../../components/Loading';
import {ProductsPicker} from '../../components/ProductsPicker';
import {ResultsModal} from '../../components/ResultsModal';
import {TextInputPaper} from '../../components/TextInputPaper';

export const FPCScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loading(true));
    dispatch(getProductsFirestore());
    dispatch(getCategoriesFirestore());
    dispatch(getIngredientsFirestore());
  }, []);
  const {ingredientsList, categoriesList, productsList} = useSelector(
    (state) => state.data,
  );
  const {showModalResult: show} = useSelector((state) => state.ui);
  const [search, setsearch] = useState('');
  const [data, setdata] = useState({
    category: '',
    product: '',
    decrease: '',
    kgBa: '',
  });
  const [ingredients, setingredients] = useState([]);
  const handleSubmit = () => {
    const pro = productsList.filter((p) => {
      if (p.id == data.product) {
        return p;
      }
    });
    const cat = categoriesList.filter((c) => {
      if (c.id == data.category) {
        return c;
      }
    });
    const selected = [pro[0], cat[0], data.decrease, data.kgBa];
    dispatch(loading(true));
    dispatch(setSelectedIngredients(ingredients));
    dispatch(getRequirementsFirestore(pro[0].clas, cat[0].id));
    dispatch(setSelectedData(selected));
    dispatch(showModalRes(true));
  };
  const handleValidate = () => {
    if (data.product == 0 || data.product == '') {
      handleAlert('Debe seleccionar un producto');
    } else if (data.category == 0 || data.category == '') {
      handleAlert('Debe seleccionar una categoría');
    } else if (data.decrease == 0 || data.decrease == '') {
      handleAlert('Debe indicar un % de merma');
    } else if (data.kgBa == 0 || data.kgBa == '') {
      handleAlert('Debe indicar los kg/bache');
    } else if (ingredients.length == 0) {
      handleAlert('Debe seleccionar ingredientes');
    } else if (!isNaN(data.decrease) && !isNaN(data.kgBa)) {
      handleSubmit();
    } else {
      handleAlert(
        'Debe ingresar valores numéricos, sí son decimales, usar punto (.)',
      );
    }
  };
  const handleAlert = (msg) => {
    Alert.alert('Datos incompletos', msg, [{text: 'Aceptar'}], {
      cancelable: true,
    });
  };
  return (
    <SafeAreaView>
      <ScrollView
        style={{height: '100%', backgroundColor: '#fff'}}
        scrollEnabled={true}>
        <View style={styles.container}>
          <Loading />
          {show && <ResultsModal />}
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
                scrollEnabled={false}
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
          <View
            style={{
              flexDirection: 'row',
              width: '55%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <TextInputPaper
              label={'%Merma'}
              onChange={(value) =>
                setdata((data) => {
                  return {...data, decrease: value};
                })
              }
              keyboard="number-pad"
              value={data.decrease}
            />
            <TextInputPaper
              label={'Kg/Bache'}
              onChange={(value) =>
                setdata((data) => {
                  return {...data, kgBa: value};
                })
              }
              keyboard="number-pad"
              value={data.kgBa}
            />
          </View>
          <View style={styles.separator}></View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.label}>Ingredientes seleccionados</Text>
            <TouchableOpacity
              onPress={() => {
                ingredients.pop();
                console.log(ingredients);
                setingredients([...ingredients]);
              }}>
              <Icon
                name="refresh"
                size={30}
                color="#003366"
                style={{marginRight: 25}}
              />
            </TouchableOpacity>
          </View>
          {ingredients.length > 0 ? (
            <View style={{paddingHorizontal: 30}}>
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
      </ScrollView>
      <FAB
        label="Resultado"
        icon="page-next-outline"
        style={styles.fab}
        onPress={() => handleValidate()}
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
