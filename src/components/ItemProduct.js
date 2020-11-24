import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteProduct, updateProduct} from '../actions/data.action';
import {loading} from '../actions/ui.action';
import {ClassificationsPicker} from './ClassificationsPicker';
import {TextInputPaper} from './TextInputPaper';

export const ItemProduct = ({product}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [updProduct, setupdProduct] = useState({
    name: product.name,
    clas: product.clas,
    id: product.id,
  });
  const handleAction = (name, id) => {
    Alert.alert(
      'Producto',
      name,
      [
        {
          text: 'ELIMINAR',
          onPress: () => {
            dispatch(loading(true));
            dispatch(deleteProduct(id));
          },
          style: 'cancel',
        },
        {text: 'MODIFICAR', onPress: () => setModalVisible(!modalVisible)},
      ],
      {cancelable: true},
    );
  };
  return (
    <>
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>
                Actualizar producto
              </Text>

              <ClassificationsPicker
                onChange={setupdProduct}
                value={updProduct['clas']}
              />

              <TextInputPaper
                label={'Nombre del producto'}
                onChange={(value) =>
                  setupdProduct({...updProduct, name: value})
                }
                value={updProduct['name']}
              />
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: '#003366',
                  margin: 5,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  dispatch(loading(true));
                  dispatch(updateProduct(updProduct));
                }}>
                <Text style={styles.textStyle}>Actualizar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.view}>
        <TouchableOpacity
          style={{flexShrink: 1, width: '100%'}}
          onPress={() => handleAction(product.name, product.id)}>
          <Text style={styles.text}>{product.name}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    padding: 8,
    alignContent: 'center',
    borderRadius: 5,
    borderColor: '#dadada',
    borderWidth: 1,
    marginBottom: 5,
  },

  text: {
    fontSize: 17,
    color: '#000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '90%',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 15,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: '#737373',
    width: '100%',
  },
});
