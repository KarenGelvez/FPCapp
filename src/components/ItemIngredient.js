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
import {TextInputPaperUp} from './TextInputPaperUp';

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
                <TextInputPaperUp
                  label={'Nombre del ingrediente'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, name: value})
                  }
                  value={updIngredient['name']}
                />
                <TextInputPaperUp
                  label={'Precio por kilo'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, pk: value})
                  }
                  keyboard="number-pad"
                  value={String(updIngredient['pk'])}
                />
                <TextInputPaperUp
                  label={'% Grasa'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, gra: value})
                  }
                  keyboard="number-pad"
                  value={String(updIngredient['gra'])}
                />
                <TextInputPaperUp
                  label={'% Proteína cárnica'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, prc: value})
                  }
                  keyboard="number-pad"
                  value={String(updIngredient['prc'])}
                />
                <TextInputPaperUp
                  label={'% Proteina total'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, tp: value})
                  }
                  keyboard="number-pad"
                  value={String(updIngredient['tp'])}
                />
                <TextInputPaperUp
                  label={'% Humedad'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, hum: value})
                  }
                  keyboard="number-pad"
                  value={String(updIngredient['hum'])}
                />
                <TextInputPaperUp
                  label={'% Sal'}
                  onChange={(value) =>
                    setupdIngredient({
                      ...updIngredient,
                      salt: value,
                    })
                  }
                  keyboard="number-pad"
                  value={String(updIngredient['salt'])}
                />
                <TextInputPaperUp
                  label={'% Fosfatos'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, po4: value})
                  }
                  keyboard="number-pad"
                  value={String(updIngredient['po4'])}
                />
                <TextInputPaperUp
                  label={'% Ascorbato'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, asc: value})
                  }
                  keyboard="number-pad"
                  value={String(updIngredient['asc'])}
                />
                <TextInputPaperUp
                  label={'% Nitrito'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, no2: value})
                  }
                  keyboard="number-pad"
                  value={String(updIngredient['no2'])}
                />
                <TextInputPaperUp
                  label={'% Almidón'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, alm: value})
                  }
                  keyboard="number-pad"
                  value={String(updIngredient['alm'])}
                />
                <TextInputPaperUp
                  label={'% Cap. retención de agua'}
                  onChange={(value) =>
                    setupdIngredient({...updIngredient, cra: value})
                  }
                  keyboard="number-pad"
                  value={String(updIngredient['cra'])}
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
