import React, {useState} from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {
  deleteIngredient,
  updateIngredient,
  updateProduct,
} from '../actions/data.action';
import {loading} from '../actions/ui.action';
import {TextInputPaper} from './TextInputPaper';

export const ItemIngredient = ({ingredient}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [updIngredient, setupdIngredient] = useState({
    name: ingredient.name,
    pk: ingredient.pk,
    gra: ingredient.gra,
    prc: ingredient.prc,
    tp: ingredient.tp,
    hum: ingredient.hum,
    salt: ingredient.salt,
    po4: ingredient.po4,
    asc: ingredient.asc,
    no2: ingredient.no2,
    alm: ingredient.alm,
    cra: ingredient.cra,
    id: ingredient.id,
  });
  const handleAction = (name, id) => {
    Alert.alert(
      'Ingrediente',
      name,
      [
        {
          text: 'ELIMINAR',
          onPress: () => {
            dispatch(loading(true));
            dispatch(deleteIngredient(id));
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
          <ScrollView>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>
                  Actualizar ingrediente
                </Text>
                <TextInputPaper
                  label={'Nombre del producto'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, name: value})
                  }
                  value={updIngredient['name']}
                />
                <TextInputPaper
                  label={'Precio por kilo'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, pk: parseFloat(value)})
                  }
                  keyboard="number-pad"
                  value={updIngredient['pk']}
                />
                <TextInputPaper
                  label={'% Grasa'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, gra: parseFloat(value)})
                  }
                  keyboard="number-pad"
                  value={updIngredient['gra']}
                />
                <TextInputPaper
                  label={'% Proteína cárnica'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, prc: parseFloat(value)})
                  }
                  keyboard="number-pad"
                  value={updIngredient['prc']}
                />
                <TextInputPaper
                  label={'% Proteina total'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, tp: parseFloat(value)})
                  }
                  keyboard="number-pad"
                  value={updIngredient['tp']}
                />
                <TextInputPaper
                  label={'% Humedad'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, hum: parseFloat(value)})
                  }
                  keyboard="number-pad"
                  value={updIngredient['hum']}
                />
                <TextInputPaper
                  label={'% Sal'}
                  onChange={(value) =>
                    setupdIngredient({
                      ...updIngredient,
                      salt: parseFloat(value),
                    })
                  }
                  keyboard="number-pad"
                  value={updIngredient['salt']}
                />
                <TextInputPaper
                  label={'% Fosfatos'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, po4: parseFloat(value)})
                  }
                  keyboard="number-pad"
                  value={updIngredient['po4']}
                />
                <TextInputPaper
                  label={'% Ascorbato'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, asc: parseFloat(value)})
                  }
                  keyboard="number-pad"
                  value={updIngredient['asc']}
                />
                <TextInputPaper
                  label={'% Nitrito'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, no2: parseFloat(value)})
                  }
                  keyboard="number-pad"
                  value={updIngredient['no2']}
                />
                <TextInputPaper
                  label={'% Almidón'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, alm: parseFloat(value)})
                  }
                  keyboard="number-pad"
                  value={updIngredient['alm']}
                />
                <TextInputPaper
                  label={'% Cap. retención de agua'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, cra: parseFloat(value)})
                  }
                  keyboard="number-pad"
                  value={updIngredient['cra']}
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
                    dispatch(updateIngredient(updIngredient));
                  }}>
                  <Text style={styles.textStyle}>Actualizar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
      <View style={styles.view}>
        <TouchableOpacity
          style={{flexShrink: 1, width: '100%'}}
          onPress={() => handleAction(ingredient.name, ingredient.id)}>
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
