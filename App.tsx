import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './components/header/header';
import Queue from './components/queue/queue';
import QueueForm from './components/form/queueForm';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDateWithTime } from './utils/date';
import { readFromStorage, writeToStorage } from './utils/fileManagement';

const useStyle = () => {
  const { width, height } = useWindowDimensions();

  return height > 580
  ? StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: '#f9b339',
      margin: 30,
      paddingHorizontal: 40,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    buttonText: {
      color: '#000',
      fontSize: 20,
      fontWeight: 'bold',
    }
  }) : StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: '#f9b339',
      margin: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    buttonText: {
      color: '#000',
      fontSize: 20,
      fontWeight: 'bold',
    }
  });
}

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const styles = useStyle();

  return (
    <View style={styles.container}>
      <Header />
      <Queue />
      <TouchableOpacity
      style={styles.button}
      onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>REGISTER CLIENT</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />

      {modalVisible ?
        (<Modal style={{flex: 1}}>
          <View style={{ margin:10, alignItems: 'flex-end'}}>
            <TouchableOpacity
            onPress={() => {setModalVisible(false)}}>
            <Ionicons name="close-circle-outline" size={40} color="#000"/>
            </TouchableOpacity>
          </View>
          <View style={{flex:1}}>
            <QueueForm setModalVisible={setModalVisible}/>
          </View>
        </Modal>) : null}
    </View>
  );
}