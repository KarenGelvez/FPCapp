import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ClassificationsPicker} from './ClassificationsPicker';
import {TextInputPaper} from './TextInputPaper';
import {registerProduct} from '../actions/data.action';
import {loading, showModalRes, showModalRP} from '../actions/ui.action';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {composition} from '../helpers/Operations';

export const ResultsModal = () => {
  const dispatch = useDispatch();
  const {selectedIngredients, selectedData, requirements} = useSelector(
    (state) => state.data,
  );
  const [data, setdata] = useState({
    g: '',
    obs: '',
  });
  const result = composition(selectedIngredients, selectedData);
  //dispatch(showModalRes(true))
  const {showModalResult: show} = useSelector((state) => state.ui);
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
        onRequestClose={() => dispatch(showModalRes(false))}>
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>
                Formulación
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>
                {selectedData[0].name} {selectedData[1].name}
              </Text>
              <View style={{alignSelf: 'flex-start', marginLeft: 10}}>
                <Text style={styles.label}>COMPOSICIÓN</Text>
                <Text>Proteína Total: {result.prot}%</Text>
                <Text>Proteína Cárnica: {result.protc}</Text>
                <Text>Proteína Vegetal: {result.protv}%</Text>
                <Text>Grasa: {result.fat}%</Text>
                <Text>Humedad: {result.hum}%</Text>
                <Text>Humedad+Grasa: {result.humfat}%</Text>
                <Text>Almidones: {result.stra}%</Text>
                <Text>Sal: {result.salt}%</Text>
                <Text>Fosfatos: {result.po4}%</Text>
                <Text>Eritorbatos: {result.asc}%</Text>
                <Text>Nitrito: {result.no2}%</Text>
                <Text>Nitrito (ppm):{result.no2ppm}% </Text>
                <Text style={styles.label}>ÍNDICES</Text>
                <Text>Humedad/Proteína: {result.humprot}%</Text>
                <Text>Grasa/Proteína:{result.fatprot}% </Text>
                <Text>Sal/Humedad: {result.salhum}%</Text>
                <Text>Balance de Agua: {result.balh2o}%</Text>
                <Text>TOTAL CRUDO: {result.crude}%</Text>
                <Text>% DE MERMA: {result.decrease}%</Text>
                <Text>TOTAL TERMINADO: {result.total}%</Text>
              </View>

              <Text style={styles.text}>
                Sí desea calcular cuántas unidades de productos obtendría,
                digite la cantidad de cada porción:
              </Text>
              <TextInputPaper
                label={'Porción(g)'}
                onChange={(value) => setdata({...newProduct, g: value})}
                value={String(data['g'])}
                keyboard="number-pad"
              />
              <TextInputPaper
                label={'Observaciones'}
                onChange={(value) => setdata({...data, obs: value})}
                value={String(data['obs'])}
              />
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: '#003366',
                  margin: 5,
                }}
                onPress={() => {
                  console.log('EXPORTAR PDF');
                  //dispatch(showModalRes(false));
                  /* dispatch(loading(true));
                dispatch(registerProduct(newProduct));
                setnewProduct(reset); */
                }}>
                <Text style={styles.textStyle}>Exportar PDF</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
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
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    margin: 5,
  },
  text: {
    fontSize: 14,
    margin: 3,
  },
});
