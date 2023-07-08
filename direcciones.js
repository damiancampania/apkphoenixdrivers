import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Linking, Text } from 'react-native';
import * as Clipboard from 'expo-clipboard';


function Direcciones({ direcciones, width,height }) {


  const [direccion, setDireccion] = useState([]);

  useEffect(() => {
    try {
      const direccionArray = direcciones.split(',');
      setDireccion(direccionArray);
    } catch (error) {
      console.log('Error al dividir las direcciones:', error);
    }
  }, [direcciones]);

  const handleCopyToClipboard = async (text) => {
    await Clipboard.setString(text);
  };

  const elementosIntermedios = direccion.slice(1, direccion.length - 1);

  const styles = StyleSheet.create({
    boton: {
      alignItems: 'center',
      height: 100,
    },
    tituloH3: {
      color: '#d9a302',
      fontFamily: 'Montserrat_800ExtraBold_Italic',
      fontSize: height*0.028118609406953,
      marginTop: '1%',
      marginBottom:'1%',
    },
    todostilo: {
      alignItems: 'center',
    },
    domicilioH4: {
      color: '#fff',
      fontSize: height*0.0255623721881391,
      fontWeight: '500',
      textAlign: 'center',
      marginBottom: height*0.003,
    },
    buttonImage: {
      width: 20,
      height: 20,
      alignItems: 'center',
    },
  });
  
  return (
    <View style={styles.boton}>
      <Text style={styles.tituloH3}>Origen:</Text>
      <TouchableOpacity onPress={() => handleCopyToClipboard(direccion[0])}>
        <Text style={styles.domicilioH4}>
          {direccion[0]}{' '}
          <Image
            style={styles.buttonImage}
            source={require('./assets/green_button.png')}
            resizeMode="contain"
          />
        </Text>
      </TouchableOpacity>

      {elementosIntermedios.length > 0 && (
        <>
          <Text style={styles.tituloH3}>Destinos Intermedios:</Text>
          {elementosIntermedios.map((elemento, index) => (
            <TouchableOpacity key={index} onPress={() => handleCopyToClipboard(elemento)}>
              <Text style={styles.domicilioH4}>
                {elemento}{' '}
                <Image
                  style={styles.buttonImage}
                  source={require('./assets/green_button.png')}
                  resizeMode="contain"
                />
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      <Text style={styles.tituloH3}>Destino Final:</Text>
      <TouchableOpacity style={styles.todostilo} onPress={() => handleCopyToClipboard(direccion[direccion.length - 1])}>
        <Text style={styles.domicilioH4}>
          {direccion[direccion.length - 1]}{' '}
          <Image
            style={styles.buttonImage}
            source={require('./assets/green_button.png')}
            resizeMode="contain"
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  boton: {
    alignItems: 'center',
  },
  tituloH3: {
    color: '#d9a302',
    fontFamily: 'Montserrat_800ExtraBold_Italic',
    fontSize: 22,
    marginTop: '1%',
    marginBottom:'1%',
  },
  todostilo: {
    alignItems: 'center',
  },
  caradenovia: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonImage: {
    width: 20,
    height: 20,
    alignItems: 'center',
  },
});

export default Direcciones;

