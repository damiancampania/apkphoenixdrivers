import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button, useWindowDimensions } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import Modal from 'react-native-modal';
import Sos from './Sos';
import Recorrido from './recorrido';
import Whatsapp from './whatsapp';
import Direcciones from './direcciones';

const LOCATION_TRACKING = 'background-location-task';



function UserLocation({width, height}) {
  const [locationStarted, setLocationStarted] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [patente, setPatente] = useState('');
  const [idd1, setIdd1] = useState('');
  const [valor1, setValor1] = useState('');
  const [idd, setIdd] = useState('');
  const [valor, setValor] = useState('');
  const [showStartButton, setShowStartButton] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showNoResultsModal, setShowNoResultsModal] = useState(false);
  const [sharingLocation, setSharingLocation] = useState('');
  const [showPatenteInput, setShowPatenteInput] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showStartTrackingButton, setShowStartTrackingButton] = useState(false);
  const [showStopTrackingButton, setShowStopTrackingButton] = useState(false);
  const [data, setData] = useState([]);////////
  const [datosi, setDatosi] = useState('');
  
 



  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 200000,
      distanceInterval: 0,
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING);
    setLocationStarted(hasStarted);
    console.log('tracking started?', hasStarted);
  };

  React.useEffect(() => {
    const config = async () => {
      let resf = await Location.requestForegroundPermissionsAsync();
      let resb = await Location.requestBackgroundPermissionsAsync();
      if (resf.status !== 'granted' && resb.status !== 'granted') {
        console.log('Permission to access location was denied');
      } else {
        console.log('Permission to access location granted');
      }
    };

    config();
  }, []);

  const startLocation = () => {
    if (showStartTrackingButton) {
      startLocationTracking();
      setShowStartTrackingButton(false);
      setShowStopTrackingButton(true);
    }
  };

  const stopLocation = () => {
    setLocationStarted(false);
    TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then((tracking) => {
      if (tracking) {
        Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
      }
    });
    setShowStopTrackingButton(false);
    setShowPatenteInput(true);
  };

  const handleSearch1 = () => {
    if (patente.trim() === '') {
      setShowNoResultsModal(false);
      setShowErrorModal(true);
      return;
    }

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    var patente1 = patente;
    fetch(`https://phoenixtravels.backend.aptugo.app/api/ubicacionyfoto/search?searchString=${patente1}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result && result.docs && result.docs.length > 0) {
          const valor1 = result.docs[0].__v;
          const idd1 = result.docs[0]._id;

          console.log(idd1);
          setIdd1(idd1);
          setValor1("valor", valor1);

          setPatente('');
          setShowPatenteInput(false);
          setShowSearchInput(true);
        } else {
          console.log('No se encontraron resultados en la API');
          setShowErrorModal(false);
          setShowNoResultsModal(true);
        }
      })
      .catch((error) => {
        console.log('Error searching in API:', error);
        setShowNoResultsModal(false);
        setShowErrorModal(true);
      });
  };

  const handleSearch = () => {
    if (searchString.trim() === '') {
      setShowNoResultsModal(false);
      setShowErrorModal(true);
      return;
    }

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    var primero = searchString;
    fetch(`https://phoenixtravels.backend.aptugo.app/api/ubicacionyfoto/search?searchString=${primero}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result && result.docs && result.docs.length > 0 && result.docs[0]._id === idd1) {
          const valor = result.docs[0].__v;
          const idd = result.docs[0]._id;
          const perno = result.docs[0];
          setData(perno);///////////
          setDatosi(data.nombreagasajado);
          //console.log ("datos ubicacion", datosi)
          //console.log ("pepeeeee", data.caradenovia);
          console.log(idd);
          setIdd(idd);
          setValor(valor);
          setSharingLocation(`Compartiendo ubicación a ${searchString}`);
          setShowSearchInput(false);
          setShowStartTrackingButton(true);
          setSearchString('');
        } else {
          console.log('No se encontraron resultados en la API');
          setShowErrorModal(false);
          setShowNoResultsModal(true);
        }
      })
      .catch((error) => {
        console.log('Error searching in API:', error);
        setShowNoResultsModal(false);
        setShowErrorModal(true);
      });
  };

  const sendLocationToAPI = (latitude, longitude, idd) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        latitud: latitude,
        longitud: longitude,
      }),
    };

    fetch(`https://phoenixtravels.backend.aptugo.app/api/ubicacionyfoto/${idd}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  const handleLocationUpdate = ({ data, error }) => {
    if (error) {
      console.log('LOCATION_TRACKING task ERROR:', error);
      return;
    }
    if (data) {
      const { locations } = data;
      let lat = locations[0].coords.latitude;
      let long = locations[0].coords.longitude;

      console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
      sendLocationToAPI(lat, long, idd);
    }
  };

  TaskManager.defineTask(LOCATION_TRACKING, handleLocationUpdate);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };
 
  const handleCloseNoResultsModal = () => {
    setShowNoResultsModal(false);
  };
 
//console.log ("width",width, "height" ,height)
const styles = StyleSheet.create({
 
  viewinput:{
   alignItems: 'center',
  },
  input: {
    width: '100%',
   // backgroundColor: 'red',//////////////////////////////////////////////
    color: '#fff',
   justifyContent: 'center',
   alignItems: 'center',
   alignContent: 'center',
   textAlign: 'center',
    height: '27%',
    fontWeight: '900',
    fontSize: height*0.0345092024539877,
    marginTop: height * 0.06,
   
    // Otros estilos de diseño para el input
  },
  buscarButton: {
    borderRadius: 30,
    backgroundColor: 'black',
    padding: 10,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  buscarButtonText: {
    color: '#d9a302',
    fontStyle: 'italic',
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 17,
  },
  
  stopTrackingText: {
    textAlign: 'center',
    fontSize: height*0.0255623721881391,
    backgroundColor: 'red',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 10,
  },
  compartirubicacion: {
    //flex:0,
    width: height*0.1917177914110429,
    position:'absolute',
    zIndex:-1,
    //alignItems: 'flex-start',
    //alignContent: 'flex-start',
   //justifyContent: 'center',
   alignSelf:'center',
   //marginLeft: 200,
   bottom: height > 592 ? height * -0.5345 : height*-0.4245,
   //left: width*0.000416666666667,
   textAlign: 'center',
  },
  sharingLocationText: {
    width: 170,
   // backgroundColor: 'red',
    textAlign: 'center',
    fontSize: height*0.0204498977505112,
    marginTop: 10,
    color: '#fff',
    marginLeft:-10,
   
  },
  startTracking: {
    //flex:1,
     width: width*0.3717083333333333,
     alignItems: 'center',
     textAlign: 'center',
     //marginTop: 1,
    // backgroundColor: 'red'
   },
   startTrackingText: {
    textAlign: 'center',
     fontSize: height*0.0255623721881391,
     backgroundColor: 'green',
     color: 'white',
     paddingHorizontal: 10,
     paddingVertical: 10,
     borderRadius: 30,
     marginTop: 10,
   },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  botonera: {
    //flex: 1,
    position: 'absolute',
    flexDirection: 'row',
   // justifyContent: 'space-between',
  //  alignSelf: 'center',
   // backgroundColor: '#b6e173',
    //position: 'absolute',
    //marginTop: height*0.64,
   
    bottom: height > 592 ? height * -0.6445 : height*-0.5745,
    
  },
  sosi:{
    flex: 4, 
    flexDirection: 'row',
    backgroundColor: 'green', 
   justifyContent: 'center',
   alignItems: 'center'
  //  padding: 10 ,

  },
  recorridoi: {
    flex:4,
    backgroundColor: '#fff',
   // width:100,

  },
  whatsappi: {
    flex:4,
   // backgroundColor: '#fff',
   
   // alignContent: 'center',
   // alignSelf:'center',
   // alignItems: 'center',
   // justifyContent: 'center',
   // marginLeft: 50,
  },
  caradenoviaH1: {
   
  },
  caradenoviaH1Span: {
    color: '#fff'
  },
});



  return (
    <View >
      {showPatenteInput && (
        <View style={styles.viewinput} >
          <TextInput
          style={styles.input}
            placeholder="Ingrese Patente"////////////////////////////////////
            placeholderTextColor="#ebebeb"
            
            value={patente}
            onChangeText={(text) => setPatente(text)}
          />
           <TouchableOpacity style={styles.buscarButton} onPress={handleSearch1}>
            <Text style={styles.buscarButtonText}>BUSCAR</Text>
          </TouchableOpacity>
        </View>
      )}

      {showSearchInput && (
         <View style={styles.viewinput} >
         <TextInput
         style={styles.input}
           placeholder="Ingrese codigo de viaje"////////////////////////////////////
           placeholderTextColor="#ebebeb"
            value={searchString}
            onChangeText={(text) => setSearchString(text)}
          />
          
          
          <TouchableOpacity style={styles.buscarButton} onPress={handleSearch}>
            <Text style={styles.buscarButtonText}>BUSCAR</Text>
          </TouchableOpacity>
        </View>
      )}

      {showStartTrackingButton && (
        <View>
          
          <Direcciones style={styles.caradenoviaH1} direcciones={data.direcciones} width={width} height={height} />
          <View style={styles.compartirubicacion}>
          
          <TouchableOpacity style={styles.startTracking} onPress={startLocation}>
            <Text style={styles.startTrackingText}>Start Tracking</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.botonera}>
          <Sos  style={styles.sosi} width={width} height={height} />
          
          <Recorrido  style={styles.recorridoi}  recorrido={data.recorrido} width={width} height={height} onPress={startLocation}  />  
          <Whatsapp   style={styles.whatsappi} whatsapp={data.whatsapp}  contacto1={data.nombrecontacto} width={width} height={height}    /////////////////////////////////////////////////////////////////>  
          />
          </View>
        </View>
      )}

      {showStopTrackingButton && (
        <View>
          <Direcciones style={styles.caradenoviaH1} direcciones={data.direcciones} width={width} height={height} />
          <View style={styles.compartirubicacion}>
          
         
          <TouchableOpacity style={styles.startTracking} onPress={stopLocation}>
            <Text style={styles.stopTrackingText}>Stop Tracking</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.botonera}>
          <Sos  style={styles.sosi} width={width} height={height} />
          
          <Recorrido  style={styles.recorridoi}  recorrido={data.recorrido} width={width} height={height} onPress={startLocation}  />  
          <Whatsapp   style={styles.whatsappi} whatsapp={data.whatsapp}  contacto1={data.nombrecontacto} width={width} height={height}    /////////////////////////////////////////////////////////////////>  
          />
          </View>
        </View>
      )}

      <Modal isVisible={showErrorModal} onBackdropPress={handleCloseErrorModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>El término de búsqueda no puede estar vacío</Text>
          <Button title="Aceptar" onPress={handleCloseErrorModal} />
        </View>
      </Modal>

      <Modal isVisible={showNoResultsModal} onBackdropPress={handleCloseNoResultsModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>No se encontraron resultados, recuerde no poner espacio ni guiones</Text>
          <Button title="Aceptar" onPress={handleCloseNoResultsModal} />
        </View>
      </Modal>
    </View>
  );
 
}


export default UserLocation;

