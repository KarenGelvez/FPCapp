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
import {TextInputPaperUp} from './TextInputPaperUp';

export const IngredientFlatList = ({ingredient, onPress}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [kg, setKg] = useState('');
  const handleAdd = () => {
    if (kg != '' && !isNaN(kg)) {
      setModalVisible(!modalVisible);
      const ingr = {...ingredient, kg: kg};
      onPress((data) => [...data, ingr]);
    } else {
      Alert.alert(
        'Datos incompletos',
        'Debe indicar una cantidad',
        [{text: 'Aceptar'}],
        {
          cancelable: true,
        },
      );
    }
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
                Indique la cantidad a usar
              </Text>

              <TextInputPaperUp
                label={'Cantidad(Kg)'}
                onChange={(value) => setKg(value)}
                keyboard="number-pad"
                value={String(kg)}
              />

              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: '#003366',
                  margin: 5,
                }}
                onPress={() => handleAdd()}>
                <Text style={styles.textStyle}>Agregar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.view}>
        <TouchableOpacity
          style={{flexShrink: 1, width: '100%'}}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.text}>{ingredient.name}</Text>
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
