import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TextInputPaper} from './TextInputPaper';
import {loading, showModalRes} from '../actions/ui.action';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {pdfFPC} from '../helpers/PDF';
import {
  Alert,
  Modal,
  PermissionsAndroid,
  Platform,
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
  const {userData} = useSelector((state) => state.auth);
  const [data, setdata] = useState({
    g: '',
    obs: '',
  });
  const result = composition(selectedIngredients, selectedData);
  const {showModalResult: show} = useSelector((state) => state.ui);

  const title = selectedData[0].name + selectedData[1].name + userData['code'];
  const [filePath, setFilePath] = useState('');
  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Se necesitan permisos',
            message: 'La aplicación necesita permisos para almacenar el PDF',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Ha ocurrido un error', err);
        return false;
      }
    } else {
      return true;
    }
  };
  const createPDF = async () => {
    const pdf = pdfFPC(
      userData,
      selectedIngredients,
      requirements[0],
      selectedData,
      data,
      result,
    );
    if (await isPermitted()) {
      let options = {
        //Content to print
        html: pdf,
        //File Name
        fileName: title,
        //File directory
        directory: 'FPCapp',
      };
      let file = await RNHTMLtoPDF.convert(options);
      setFilePath(file.filePath);
      Alert.alert(
        'PDF descargado',
        'Puede encontrar el PDF en la carpeta FPCapp',
      );
    }
  };
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
                <Text>Nitrito (ppm): {result.no2ppm} </Text>
                <Text style={styles.label}>ÍNDICES</Text>
                <Text>Humedad/Proteína: {result.humprot}%</Text>
                <Text>Grasa/Proteína: {result.fatprot}% </Text>
                <Text>Sal/Humedad: {result.salhum}%</Text>
                <Text>Balance de Agua: {result.balh2o}%</Text>
                <Text>TOTAL CRUDO: {result.crude}kg</Text>
                <Text>
                  {selectedData[2]}% DE MERMA: {result.decrease}kg
                </Text>
                <Text>TOTAL TERMINADO: {result.total}kg</Text>
              </View>

              <Text style={styles.text}>
                Sí desea calcular cuántas unidades de productos obtendría,
                digite la cantidad de cada porción:
              </Text>
              <TextInputPaper
                label={'Porción(g)'}
                onChange={(value) => setdata({...data, g: value})}
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
                  createPDF();
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
