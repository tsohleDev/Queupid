import React, { useState } from "react";
import { useWindowDimensions, StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Profile from "../../profile/profile";
import { FormDataInterface } from "../../form/formGroup";

interface QueueCardProps {
    profile: FormDataInterface
    index: number,
}

const useStyle = () => {
  const { height } = useWindowDimensions();

  return height > 580
  ? StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 10,
      marginHorizontal: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: '#666',
      backgroundColor: '#d9d9d944',
      flexDirection: 'row',
      borderRadius: 10,
    },
    containerCurrent: {
      flex: 1,
      marginVertical: 20,
      marginHorizontal: 5,
      padding: 20,
      borderWidth: 1,
      borderColor: '#666',
      backgroundColor: '#f9b339',
      flexDirection: 'row',
      borderRadius: 10,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      marginHorizontal: 30,
    },
    nameCurrent: {
      fontSize: 35,
      fontWeight: 'bold',
      marginHorizontal: 30,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      flex: 1,
    }
  }) : StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 5,
      marginHorizontal: 15,
      padding: 10,
      borderWidth: 1,
      borderColor: '#666',
      backgroundColor: '#d9d9d944',
      flexDirection: 'row',
      borderRadius: 10,
    },
    containerCurrent: {
      flex: 1,
      marginVertical: 10,
      marginHorizontal: 5,
      padding: 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: '#666',
      backgroundColor: '#f9b339',
      flexDirection: 'row',
      borderRadius: 10,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      marginHorizontal: 30,
    },
    nameCurrent: {
      fontSize: 30,
      fontWeight: 'bold',
      marginHorizontal: 20,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      flex: 1,
    }
  });
}

const QueueCard = ({profile, index} : QueueCardProps) => {
  const { name } = profile;
  const [modalOpen, setModalOpen] = useState(false);
  const styles = useStyle();

  const handleClick = () => {
    setModalOpen(true);
  }

  return (
  <View style={index === 0 ? styles.containerCurrent : styles.container}>
      <Ionicons name="person-outline" size={ index === 0 ? 42 : 32} color="black" style={{alignSelf:'center'}} />
      <Text style={index === 0 ? styles.nameCurrent : styles.name}>{name}</Text>
      <TouchableOpacity style={styles.button}
      onPress={handleClick}>
          <Ionicons name="ellipsis-vertical" size={32} color="black" />
      </TouchableOpacity>

      <Modal visible={modalOpen}>
        <Profile data={profile} setModalOpen={setModalOpen}/>
      </Modal>
  </View> );
}
 
export default QueueCard;