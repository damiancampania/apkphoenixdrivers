import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Linking, Text } from 'react-native';

function Whatsapp({ whatsapp, contacto1,width, height }) {
  const [numero, setNumero] = useState('');

  useEffect(() => {
    setNumero(` ${contacto1}`);
  }, [contacto1]);

  const handleWhatsAppCall = async () => {
    try {
      const url = `https://api.whatsapp.com/send?phone=${whatsapp}`;
      await Linking.openURL(url);
    } catch (error) {
      console.log('Error al realizar la llamada de WhatsApp:', error);
    }
  };
  
const styles = StyleSheet.create({
  boton:{
    flex: 4,
    width: 100,
   // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Alineación vertical centrada
    left: width > 340 ? width * -0.0130208333333333 : width*-0.0330208333333333,
    marginTop: -80,
    top:0,
   // backgroundColor: 'red',
  },
  imagentitulo123: {
    width: width*0.1953125,
    height: width*0.1953125,
   alignItems: 'center',
  // paddingRight: 15,
  },
  caradenovia: {
    width: width*0.2564583333333333,
    fontFamily: 'Montserrat_800ExtraBold_Italic',
    fontSize: height*0.021118609406953,
    flexGrow: 1,
  flexShrink: 1,
    color: '#fff',
    fontWeight:'500',
    textAlign: 'center',
    textAlignVertical: 'bottom',
   height: 224,
    marginTop: -200,
    marginBottom: 11,
   // marginLeft: '0%',
   // marginRight:-10,
   // backgroundColor: 'red'
   
  },
});
  return (
    <View style={styles.boton}>
      <Text style={styles.caradenovia}>{numero}</Text>
      
      <TouchableOpacity onPress={handleWhatsAppCall}>
        <Image
          style={styles.imagentitulo123}
          source={require('./assets/whatsappbotonfinal.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}


export default Whatsapp;

