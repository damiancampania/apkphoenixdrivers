import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Linking } from 'react-native';
import { Audio } from 'expo-av';

function Sos() {
  const handlePhoneCall = async () => {
    try {
      // Reproducir tono de llamada simulado
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/atencion.mp3')
      );
      await sound.playAsync();

      // Esperar 2 segundos antes de realizar la llamada
      await new Promise(resolve => setTimeout(resolve, 3700));

      // Realizar la llamada automáticamente
      await Linking.openURL('tel:1127659712');

      // Detener el tono de llamada después de realizar la llamada
      await sound.unloadAsync();
    } catch (error) {
      console.log('Error al realizar la llamada:', error);
    }
  };

  return (
    <View style={styles.boton}>
      <TouchableOpacity onPress={handlePhoneCall}>
        <Image
          style={styles.imagentitulo}
          source={require('./assets/sosboton.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  boton: {

alignItems: 'flex-start',
  },
  imagentitulo: {
    width: 75,
    height: 75,
   marginLeft: 10,
    marginTop: 10,
  
  },
});

export default Sos;
