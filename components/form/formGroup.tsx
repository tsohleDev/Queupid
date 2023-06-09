import { StyleSheet, View, Text, TextInput } from "react-native";

export interface FormDataInterface {
    name: string,
    phoneNumber: string,
    barberName: string,
    service: string,
    date: string,
    time: string
}

interface FormGroupProps {
    label: string,
    placeholder: string,
    setFormData: any
}

const FormGroup = ({label, placeholder, setFormData}: FormGroupProps) => {
    return ( <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={
            (text) => setFormData((formData: FormDataInterface) =>{
                if (label === 'NAME') return {...formData, name: text }
                else if (label === 'PHONE NUMBER') return {...formData, phoneNumber:text}
                else if (label === 'BARBER NAME') return {...formData, barberName:text}
                else if (label === 'SERVICE') return {...formData, service:text}
            })}
        />
    </View> );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#444b',
    },
    input: {
        borderWidth: 1,
        borderColor: '#666',
        backgroundColor: '#d9d9d944',
        borderRadius: 10,
        width: '80%',
        height: 50,
        marginVertical: 10,
        paddingHorizontal: 10,
    }
});
 
export default FormGroup;