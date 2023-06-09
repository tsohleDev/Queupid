import { useWindowDimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { getDateWithTime } from "../../utils/date";
import { readFromStorage, fileExistsInStorage } from "../../utils/fileManagement";
import Ionicons from '@expo/vector-icons/Ionicons';
import QueueCard from "./card/queueCard";

//custom styles hook for a responsive design
const useStyle = () => {
  const { height } = useWindowDimensions();

  return height > 580
  ? StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    queue: {
        width: '98%',
        height: '95%',
        backgroundColor: '#d9d9d900',
        borderRadius: 20,
        borderColor: '#f9b339',
        borderWidth: 2,
        alignContent: 'center',
    },
    date: {
        fontSize: 25,
        marginVertical: 5,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        paddingRight: 20,
        color: '#000b',
    },
    noQueue: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'stretch',
      alignItems: 'center',
    },
    message: {
      fontSize: 30,
      fontWeight: 'bold'
    }
  }) : StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    queue: {
        width: '92%',
        backgroundColor: '#d9d9d900',
        borderRadius: 20,
        borderColor: '#f9b339',
        borderWidth: 2,
        alignContent: 'center',
    },
    date: {
        fontSize: 25,
        marginVertical: 5,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        paddingRight: 20,
        color: '#000b',
    },
    noQueue: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'stretch',
      alignItems: 'center',
    },
    message: {
      fontSize: 30,
      fontWeight: 'bold'
    }
  });
}

// Queue component
const getClientFromJson = async (date: string) => {
  //read from storage
  let todayFileExists = await fileExistsInStorage(`my${date}`);

  if (todayFileExists) {
    let todayQueue = await readFromStorage(`my${date}`);

    //console.log('today', todayQueue);
    
    return todayQueue;
  }

  return [];
}


const Queue = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [queue, setQueue] = useState([]); //[{name: 'John Doe',  time: '12:34AM', date: new Date().toLocaleDateString(), barberName: 'mike', phoneNumber: '54365327', service: 'fade', id: 1}
  const styles = useStyle();

  //effect to update the day
  useEffect(() => {
    const date = getDateWithTime()[0];

    //insert whitespace between letters and numbers,
    let formattedDate = date.replace(/([a-z])([0-9])/gi, '$1 $2');
    formattedDate = formattedDate.replace(/([0-9])([a-zA-Z])/gi, '$1 $2');

    setCurrentDate(formattedDate);
  }, []); 

  //effect to update the queue
  useEffect( () => {
    const date = getDateWithTime()[0];

    getClientFromJson(date)
    .then(jsonString => 
      {
        //check if type is string
        if (typeof jsonString === 'string') {
          setQueue(Object.values(JSON.parse(jsonString)));
        }
      }
    )
  }, [setQueue, queue]);

  return ( 
    <View style={styles.container}>
        <Text style={styles.date}>{`${currentDate}`}</Text>
        { queue.length > 0
          ? <FlatList 
            style={styles.queue}
            data={queue.reverse()}
            renderItem={({ item, index }) => (
              <QueueCard profile={item} index={index}/>
            )}>
          </FlatList>
          : <View style={styles.noQueue}>
            <Ionicons name="pause-outline" size={170} color="#f9b339"/>
            <Text style={styles.message}>REST TiME!</Text>
          </View>
        }
    </View> 
  );
}

export default Queue;