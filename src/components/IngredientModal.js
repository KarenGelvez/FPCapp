import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TextInputPaper} from './TextInputPaper';
import {registerIngredient} from '../actions/data.action';
import {loading, showModalRI} from '../actions/ui.action';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export const IngredientModal = () => {
  const dispatch = useDispatch();
  const {showModalRegIngr: show} = useSelector((state) => state.ui);
  const [newIngredient, setnewIngredient] = useState({
    name: '',
    pk: '',
    gra: '',
    prc: '',
    tp: '',
    hum: '',
    salt: '',
    po4: '',
    asc: '',
    no2: '',
    alm: '',
    cra: '',
    id: 'id',
  });
  const reset = {
    name: '',
    pk: '',
    gra: '',
    prc: '',
    tp: '',
    hum: '',
    salt: '',
    po4: '',
    asc: '',
    no2: '',
    alm: '',
    cra: '',
    id: 'id',
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={show}
        onRequestClose={() => dispatch(showModalRI(!show))}>
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>
                Agregar nuevo ingrediente
              </Text>
              <TextInputPaper
                label={'Nombre del producto'}
                onChange={(value) =>
                  setnewIngredient({...newIngredient, name: value})
                }
                value={newIngredient['name']}
              />
              <TextInputPaper
                label={'Precio por kilo'}
                onChange={(value) =>
                  setnewIngredient({...newIngredient, pk: parseFloat(value)})
                }
                keyboard="number-pad"
                value={newIngredient['pk']}
              />
              <TextInputPaper
                label={'% Grasa'}
                onChange={(value) =>
                  setnewIngredient({...newIngredient, gra: parseFloat(value)})
                }
                keyboard="number-pad"
                value={newIngredient['gra']}
              />
              <TextInputPaper
                label={'% Proteína cárnica'}
                onChange={(value) =>
                  setnewIngredient({...newIngredient, prc: parseFloat(value)})
                }
                keyboard="number-pad"
                value={newIngredient['prc']}
              />
              <TextInputPaper
                label={'% Proteina total'}
                onChange={(value) =>
                  setnewIngredient({...newIngredient, tp: parseFloat(value)})
                }
                keyboard="number-pad"
                value={newIngredient['tp']}
              />
              <TextInputPaper
                label={'% Humedad'}
                onChange={(value) =>
                  setnewIngredient({...newIngredient, hum: parseFloat(value)})
                }
                keyboard="number-pad"
                value={newIngredient['hum']}
              />
              <TextInputPaper
                label={'% Sal'}
                onChange={(value) =>
                  setnewIngredient({...newIngredient, salt: parseFloat(value)})
                }
                keyboard="number-pad"
                value={newIngredient['salt']}
              />
              <TextInputPaper
                label={'% Fosfatos'}
                onChange={(value) =>
                  setnewIngredient({...newIngredient, po4: parseFloat(value)})
                }
                keyboard="number-pad"
                value={newIngredient['po4']}
              />
              <TextInputPaper
                label={'% Ascorbato'}
                onChange={(value) =>
                  setnewIngredient({...newIngredient, asc: parseFloat(value)})
                }
                keyboard="number-pad"
                value={newIngredient['asc']}
              />
              <TextInputPaper
                label={'% Nitrito'}
                onChange={(value) =>
                  setnewIngredient({...newIngredient, no2: parseFloat(value)})
                }
                keyboard="number-pad"
                value={newIngredient['no2']}
              />
              <TextInputPaper
                label={'% Almidón'}
                onChange={(value) =>
                  setnewIngredient({...newIngredient, alm: parseFloat(value)})
                }
                keyboard="number-pad"
                value={newIngredient['alm']}
              />
              <TextInputPaper
                label={'% Cap. retención de agua'}
                onChange={(value) =>
                  setnewIngredient({...newIngredient, cra: parseFloat(value)})
                }
                keyboard="number-pad"
                value={newIngredient['cra']}
              />
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: '#003366',
                  margin: 5,
                }}
                onPress={() => {
                  dispatch(showModalRI(!show));
                  dispatch(loading(true));
                  dispatch(registerIngredient(newIngredient));
                  setnewIngredient(reset);
                }}>
                <Text style={styles.textStyle}>Agregar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </>
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
