import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, Dimensions } from 'react-native';
import UserLocation from './ubicacionviaje';
import { StatusBar } from 'expo-status-bar';
//import { createStackNavigator } from '@react-navigation/stack';
import GradientText from './GradientText';
import { useFonts, Montserrat_100Thin, Montserrat_200ExtraLight, Montserrat_300Light, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_800ExtraBold, Montserrat_900Black, Montserrat_100Thin_Italic, Montserrat_200ExtraLight_Italic, Montserrat_300Light_Italic, Montserrat_400Regular_Italic, Montserrat_500Medium_Italic, Montserrat_600SemiBold_Italic, Montserrat_700Bold_Italic, Montserrat_800ExtraBold_Italic, Montserrat_900Black_Italic } from '@expo-google-fonts/montserrat';


export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
  });

  

  if (!fontsLoaded) {
    return null;
  }
  
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4b4948',
      alignItems: 'center',
    },
    logo: {
      width: '100%',
      backgroundColor: '#000',
      alignItems: 'center',
    },
    imagentitulo: {
      width: screenWidth * 0.75,
      height: screenHeight * 0.0639059304703476,
      marginTop: screenHeight * 0.024,
    },
    tituloH1Container: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    tituloH1Text: {
      fontFamily: 'Montserrat_900Black_Italic',
      fontSize: screenHeight * 0.0421779141104294,
      textAlign: 'center',
      color: '#fff',
      paddingHorizontal: 5,
    },
    tituloH1Span: {
      fontFamily: 'Montserrat_900Black_Italic',
      fontSize: screenHeight * 0.0421779141104294,
      textAlign: 'center',
      color: '#EFAF39',
      backgroundColor: 'transparent',
    },
    tituloH3: {
      color: '#d9a302',
      fontFamily: 'Montserrat_600SemiBold_Italic',
      fontSize: screenHeight * 0.0357873210633947,
      textAlign: 'center',
      marginBottom: 10,
    },
    fondo1: {
      width: '100%',
      position: 'absolute',
      height: '100%',
      zIndex: -1,
      backgroundColor: 'transparent',
    },
    contenidoFondo: {
      height: '100%',
      backgroundColor: 'transparent',
      marginTop: '42%',
      justifyContent: 'flex-start',
    },
    navcontainer: {
      backgroundColor: 'transparent',
      height: 150,
    },
  });

  //const Stack = createStackNavigator();

  return (
    <View style={styles.container}>
     <StatusBar style="auto" hidden={true} />
      <View style={styles.logo}>
        <Image style={styles.imagentitulo} source={require('./assets/logo.png')} resizeMode="contain" />
        <View style={styles.tituloH1Container}>
          <Text style={styles.tituloH1Text}>Phoenix</Text>
          <GradientText style={styles.tituloH1Span}>Travels</GradientText>
        </View>
        <Text style={styles.tituloH3}>Driver's App</Text>
      </View>
      <ImageBackground source={require('./assets/Azul.png')} style={styles.fondo1} resizeMode="stretch">
        <View style={styles.contenidoFondo}>
          <UserLocation width={screenWidth} height={screenHeight}/>
          
        </View>
      </ImageBackground>
    </View>
  );
}



