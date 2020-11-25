import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {loading, showModalRP} from '../../actions/ui.action';
import {
  getClassificationsFirestore,
  getProductsFirestore,
} from '../../actions/data.action';
import {Loading} from '../../components/Loading';
import {ItemProduct} from '../../components/ItemProduct';
import {FAB} from 'react-native-paper';
import {ProductModal} from '../../components/ProductModal';

export const ProductsScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loading(true));
    dispatch(getProductsFirestore());
    dispatch(getClassificationsFirestore());
  }, []);
  const {showModalRegProd: show} = useSelector((state) => state.ui);
  const {productsList} = useSelector((state) => state.data);
  const [search, setsearch] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Loading />
        <ProductModal />
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
          Productos Cárnicos Procesados
        </Text>
        {productsList.length > 0 ? (
          <FlatList
            data={productsList}
            renderItem={({item}) =>
              item.name.toLowerCase().includes(search) && (
                <ItemProduct product={item} />
              )
            }
            keyExtractor={(item) => String(item.id)}
          />
        ) : (
          <Text>Aún no hay productos registrados</Text>
        )}
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => dispatch(showModalRP(!show))}
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
