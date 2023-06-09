import { useWindowDimensions, StyleSheet, View, Text, Image} from "react-native";

const PLACE_HOLDER = require('../../assets/logo.png');
const adminName = 'ADMIN';

const useStyle = () => {
    const { height } = useWindowDimensions();

    return height > 580 
    ? StyleSheet.create({
        container: {
            paddingTop: 30,
            paddingHorizontal: 20,
            height: 110,
            flexDirection: 'row',
            backgroundColor: '#ededef',
            alignItems: 'center',
            justifyContent:'space-between',
            borderColor: '#f9b339',
            borderBottomWidth: 2,
        },
        text: {
            fontSize: 35, 
            fontWeight: 'bold', 
            color: '#f9b339'
        },
        logo: {  
            width: 60, 
            height: 60
        }
    }) : StyleSheet.create({
        container: {
            paddingTop: 15,
            paddingBottom: 5,
            paddingHorizontal: 20,
            height: 80,
            flexDirection: 'row',
            backgroundColor: '#ededef',
            alignItems: 'center',
            justifyContent:'space-between',
            borderColor: '#f9b339',
            borderBottomWidth: 2,
        }, 
        text: {
            fontSize: 25,
            fontWeight: 'bold', 
            color: '#f9b339'
        },
        logo: {  
            width: 50, 
            height: 50
        }
    });
}

const Header = () => {
    const styles = useStyle();

    return ( <View style={styles.container}>
        <Image source={PLACE_HOLDER} style={styles.logo} />
        <View>
            <Text style={styles.text}>{adminName}</Text>
        </View>
    </View>);
}
 
export default Header;