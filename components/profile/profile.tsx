import { useState } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { FormDataInterface } from "../form/formGroup";
import { Ionicons } from '@expo/vector-icons';
import { editClientInQueueOnBothFiles, removeClientFromQueue } from "../../utils/fileManagement";

interface ProfileProps {
    data: any,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const Profile = ({data, setModalOpen} : ProfileProps) => {
    const [editMode, setEditMode] = useState(false)
    const [formData, setFormData] = useState (data)

    const saveChanges = () => {
        setEditMode(false)

        //save changes to file
        editClientInQueueOnBothFiles(data.time, data.date, formData)
        console.log('saved changes')
    }

    return ( 
    <View style={styles.container}>
        <TouchableOpacity
        onPress={() => setModalOpen(false)}
        style={{ position: 'absolute', top: 10, right: 10 ,alignSelf:'flex-end'}}
        >
            <Ionicons 
            name="close-outline" 
            size={60} 
            color="black" />
        </TouchableOpacity>
        
        <Ionicons name="person" size={100} color="black" style={{marginVertical: 20, alignSelf:'center'}} />
        
        <ScrollView>
            {Object.keys(data).filter(key => key != 'id') .map((key, index) => {
                return (
                    <View key={index} style={styles.group}>
                        <Text style={styles.label}>{key.toUpperCase()}</Text>
                        { editMode 
                        ? <TextInput style={styles.input} 
                        value={formData[key]} 
                        editable={true}
                        onChangeText={(value) => {setFormData({...formData, [key]: value})}}
                        //onChange={(value) => {handleChanges(value, 'phoneNumber')}}
                        />
                        : <Text style={styles.input}>{formData[key]}</Text> }
                    </View>
                )})}
        </ScrollView>
        
        {
            //if editMode is true, show the checkmark button, else show the pencil and trash buttons
            editMode
            ? <TouchableOpacity
            style={styles.buttons}
            onPress={() => {saveChanges()}}
            >
                <Ionicons 
                name="checkmark-circle" 
                size={60} 
                color="#050" />
            </TouchableOpacity>
            : <View style={styles.buttons}>
            <TouchableOpacity
            onPress={() => {setEditMode(true)}}
            style={{}}
            >
                <Ionicons 
                name="pencil" 
                size={60} 
                color="#001" />
            </TouchableOpacity>
 
            <TouchableOpacity
            onPress={() => {removeClientFromQueue(data.time, `my${data.date}`); setModalOpen(false);}}
            >
                <Ionicons 
                name="trash-bin" 
                size={60} 
                color="#100" />
            </TouchableOpacity>
            </View>
        }

        
    </View> ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        elevation: 10,
        borderRadius: 20,
    },
    group: {
        justifyContent: 'center',
        margin: 10,
    },
    label: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#444b',
        marginHorizontal: 20,
    },
    input: {
        fontSize: 30,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#f9b339',
        backgroundColor: '#d9d9d944',
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        width: '90%',
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 20
    }
});
 
export default Profile;