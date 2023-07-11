import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Linking, Text } from 'react-native';
import { Audio } from 'expo-av';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';

function Recorrido({ recorrido, onPress,width,height }) {
  const [showPopup, setShowPopup] = useState(false);
  const [latitud1, setLatitud1] = useState(null);
  const [longitud1, setLongitud1] = useState(null);
  const [showPopupError, setShowPopupError] = useState(false);

  useEffect(() => {
    checkGPSValues();
  }, []);

  const checkGPSValues = async () => {
    try {
      
      
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLatitud1(latitude);
      setLongitud1(longitude);

    } catch (error) {
      console.log('Error al cargar ruta', error);
    }
  };
  const handleRuta = async () => {
    if (latitud1 == null || longitud1 == null || latitud1 === undefined || longitud1 === undefined) {
      setShowPopupError(true);
      const { sound } = await Audio.Sound.createAsync(require('./assets/perdidadesenal.mp3'));
      await sound.playAsync();

     
      return;
    }
    else{
setShowPopup(true)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de ubicación no concedido');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitud1(location.coords.latitude);
      setLongitud1(location.coords.longitude);

    } catch (error) {
      console.log('Error al cargar ruta', error);
    }
  };
  }
  const handleAccept = async () => {
    setShowPopup(false);
    onPress();

    try {
      const { sound } = await Audio.Sound.createAsync(require('./assets/iniciando_recorrido.mp3'));
      await sound.playAsync();

      await new Promise(resolve => setTimeout(resolve, 3000));
      const url = `https://www.google.com/maps/dir/${latitud1},${longitud1}/${recorrido}`;
      await Linking.openURL(url);
      await sound.unloadAsync();
      console.log(url);
    } catch (error) {
      console.log('Error al cargar ruta', error);
    }
  };
  const handleAcceptError = async () => {
    setShowPopupError(false);
    checkGPSValues();
  }

  const styles = StyleSheet.create({
    imagentitulo: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 43,
      marginRight: 50,
      marginTop: 25,
     // backgroundColor: 'red',
    },
    image: {
      justifyContent: 'center',
      width: width*0.3125,
      height: height*0.058125,
      borderRadius: 100,
      opacity: 0.97,
      shadowColor: '#fff',
      paddingBottom: 50,
      shadowOpacity: 0.8,
      shadowRadius: 4,
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
    acceptButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    acceptErrorButton: {
      backgroundColor: 'red',
     
      alignSelf: 'center',
      width: '50%',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    acceptButtonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
    },
  });

  return (
    <View style={styles.imagentitulo}>
      <TouchableOpacity onPress={handleRuta}>
        <Image
          style={styles.image}
          source={require('./assets/recorrido8.png')}
          resizeMode="stretch"
        />
      </TouchableOpacity>

      <Modal isVisible={showPopup} onBackdropPress={handleAccept}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Recuerde detener seguimiento con el botón Stop Tracking en su destino final</Text>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.acceptButtonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={showPopupError} onBackdropPress={handleAcceptError}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Error de señal. Verifique que tenga buena recepción de señal y que tenga activo el GPS con la opción "Permitir todo el tiempo" para poder ver el recorrido.</Text>
          <TouchableOpacity style={styles.acceptErrorButton} onPress={handleAcceptError}>
            <Text style={styles.acceptButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
}


export default Recorrido;



