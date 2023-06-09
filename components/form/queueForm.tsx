import React , { useState } from 'react';
import { useWindowDimensions, StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { writeToStorage, readFromStorage, fileExistsInStorage } from '../../utils/fileManagement';
import FormGroup from './formGroup';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDateWithTime } from '../../utils/date';

//custom styles hook for a responsive design
const useStyle = () => {
  const { height } = useWindowDimensions();

  return height > 580
  ? StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d9d9d900',
        borderRadius: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#f9b339',
        width: '60%',
        height: 50,
        justifyContent: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    }
  }) : StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#d9d9d900',
      borderRadius: 20,
      alignItems: 'center',
    },
    button: {
        backgroundColor: '#f9b339',
        width: '60%',
        height: 50,
        justifyContent: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    }
  });
}


const QueueForm = ({setModalVisible}: {setModalVisible:React.Dispatch<React.SetStateAction<boolean>>}) => {
  // formData is used to store the data from the form
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    barberName: '',
    service: '',
    date: '',
    time: ''
  });

  // handleKeyboardHide and handleKeyboardShow are used to hide the form when the keyboard is open
  const handleSubmit = async () => {
    const [date, time] = getDateWithTime()
    const id =  Math.floor(Math.random() * 1000000)

    setFormData((prev) => {
      return {
        ...prev,
        date,
        time,
        id,
      };
    });

    let json = {
      [time]: {...formData, date, time, id}
    } 

    let myJson =  {} 
    
    //check if file already exists
    /*
    difference between mytoday and today is that today
    stores all data i.e archive and mytoday only deals with the queue
    */
    const todayFileExists = await fileExistsInStorage(date);
    const myTodayFileExists = await fileExistsInStorage(`my${date}`)

    //update myJson first before updating json
    if (myTodayFileExists) {
      const jsonString = await readFromStorage(`my${date}`)

      myJson = { ...json, ...JSON.parse(jsonString) }
    }

    if (todayFileExists) {
      const jsonString = await readFromStorage(date)

      json = { ...json, ...JSON.parse(jsonString) }
    }

    //r is the void returned from the promise
    //save the file with todays date
    console.log(myJson);
    
    const response = await writeToStorage(date, json);
    const myResponse = await writeToStorage(`my${date}`, myJson);

    //close modal
    setModalVisible(false)
  };

  // data is used to build the form
  const formProps = [
    { label: 'NAME', placeholder: 'Full name' },
    { label: 'PHONE NUMBER', placeholder: 'Phone number' },
    { label: 'BARBER NAME', placeholder: "Barber's name" },
    { label: 'SERVICE', placeholder: 'Service' },
  ];

  const styles = useStyle();

  return (
    <View style={{flex: 1}}>
      <TouchableWithoutFeedback 
      onPress={() => {
      Keyboard.dismiss()}}
      style={styles.container}>
        <View style={styles.container}> 
          <Ionicons name="person-outline" size={32} color="black" />
          <Text style={{fontSize: 30, paddingVertical: 10, fontWeight: 'bold', color: '#f9b339'}}>Queue Form</Text>
            
          <ScrollView
          style={{width: '100%'}}>
            {formProps.map((item, index) => (
              <FormGroup key={index} label={item.label} placeholder={item.placeholder} setFormData={setFormData}/>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default QueueForm;
