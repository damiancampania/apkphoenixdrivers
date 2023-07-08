import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Linking, Text } from 'react-native';
import { Audio } from 'expo-av';
import Modal from 'react-native-modal';

function Recorrido({ recorrido, onPress }) {
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar la visibilidad del popup

  const handleRuta = async () => {
    setShowPopup(true)
   // onPress(); // Llamar al prop onPress después de abrir la URL
  }

  const handleAccept = async() => {
    setShowPopup(false); // Ocultar el popup al presionar el botón de aceptar
    onPress(); // Llamar al prop onPress después de abrir la URL
    try {
      const { sound } = await Audio.Sound.createAsync(require('./assets/iniciando_recorrido.mp3'));
      await sound.playAsync();

      // Esperar 2 segundos antes de realizar la llamada
      await new Promise(resolve => setTimeout(resolve, 3000));
      const url = `${recorrido}`;
      // Generar la URL de WhatsApp con el número de teléfono
      await Linking.openURL(url);
      await sound.unloadAsync();
     // setShowPopup(true); // Mostrar el popup después de abrir la URL
     
    } catch (error) {
      console.log('Error al cargar ruta', error);
    }
  
  
  
  };

  return (
    <View style={styles.imagentitulo}>
      <TouchableOpacity onPress={handleRuta}>
        <Image
          style={styles.image}
          source={require('./assets/recorrido8.png')}
          resizeMode="stretch"
        />
      </TouchableOpacity>

      <Modal isVisible={showPopup} onBackdropPress={() => setShowPopup(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Recuerde detener seguimiento con el boton Stop Tracking en su destino final</Text>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.acceptButtonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  imagentitulo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 43,
    marginRight: 50,
    marginTop: 25,
  },
  image: {
    justifyContent: 'center',
    width: 120, // Ancho original de la imagen
    height: 30, // Alto original de la imagen
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
  acceptButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Recorrido;


