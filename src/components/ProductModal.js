import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ClassificationsPicker} from './ClassificationsPicker';
import {TextInputPaper} from './TextInputPaper';
import {registerProduct} from '../actions/data.action';
import {loading, showModalRP} from '../actions/ui.action';
import {Modal, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

export const ProductModal = () => {
  const dispatch = useDispatch();
  const {showModalRegProd: show} = useSelector((state) => state.ui);
  const [newProduct, setnewProduct] = useState({
    name: '',
    clas: '',
    id: 'id',
  });
  const reset = {name: '', clas: '', id: 'id'};
  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={show}
        onRequestClose={() => dispatch(showModalRP(!show))}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              Agregar nuevo producto
            </Text>

            <ClassificationsPicker
              onChange={setnewProduct}
              value={newProduct['clas']}
            />

            <TextInputPaper
              label={'Nombre del producto'}
              onChange={(value) => setnewProduct({...newProduct, name: value})}
              value={newProduct['name']}
            />
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: '#003366',
                margin: 5,
              }}
              onPress={() => {
                dispatch(loading(true));
                dispatch(showModalRP(!show));
                dispatch(registerProduct(newProduct));
                setnewProduct(reset);
              }}>
              <Text style={styles.textStyle}>Agregar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
