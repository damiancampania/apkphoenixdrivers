/*notificacion push pero para versiones menores de android 13

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

const LOCATION_TASK_NAME = 'background-location-task';

export default class Component extends React.Component {
  onPress = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 300000,
      distanceInterval: 0,
    });
  };

  handleLocationUpdate = ({ data, error }) => {
    if (error) {
      sendErrorNotification(error.message);
      return;
    }
    if (data) {
      const { locations } = data;
      sendNotification(JSON.stringify(locations));
      // Realiza alguna acción con las ubicaciones capturadas en segundo plano,
      // como enviarlas a tu servidor con axios o fetch API
      console.log("Latitud:", locations[0].coords.latitude);
      console.log("Longitud:", locations[0].coords.longitude);
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onPress} style={{ marginTop: 100 }}>
        <Text>Enable background location</Text>
      </TouchableOpacity>
    );
  }

  componentDidMount() {
    TaskManager.defineTask(LOCATION_TASK_NAME, this.handleLocationUpdate);
  }
}

async function sendErrorNotification(errorMessage) {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Error en la tarea de ubicación',
      body: errorMessage,
    },
    trigger: null, // Enviar inmediatamente
  });

  console.log('ID de la notificación:', notificationId);
}

async function sendNotification(message) {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Nueva ubicación',
      body: message,
    },
    trigger: null, // Enviar inmediatamente
  });

  console.log('ID de la notificación:', notificationId);
}*/
