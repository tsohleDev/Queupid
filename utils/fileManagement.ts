import * as FileSystem from 'expo-file-system';
import { FormDataInterface } from '../components/form/formGroup';

/**
 * The file system will be used to store the queue data.
 * Two files will be used:
 * 1. The queue file - will contain the queue data and
 *   will be used to display the queue to the user.
 *   The file name will be the date of the queue.
 * 2. The my queue file - will contain the queue data of the barber.
 *   Thus more dynamic changes can be made to the queue.
 *   i.e - remove a client from the queue after he was served. etc
 *   The file name will be the date of the queue with the prefix 'my'.
 */

interface DataInterface {
    [x : string] : FormDataInterface
}

// Write to storage
export const writeToStorage = async (fileName: string, data : DataInterface) : Promise<void> => {
    const fileUri = FileSystem.documentDirectory + fileName + '.json';
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), { encoding: FileSystem.EncodingType.UTF8 });
}

// Read from storage
export const readFromStorage = async (fileName: string): Promise<string> => {
    const fileUri = FileSystem.documentDirectory + fileName + '.json';
    const data = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });

    return data;
}

// check if file exists
export const fileExistsInStorage = async (fileName: string): Promise<boolean> => {
    const uri = FileSystem.documentDirectory + fileName + '.json';
    
    return FileSystem
            .getInfoAsync(uri)
            .then((info: FileSystem.FileInfo) => info.exists);
}

//delete person from queue
export const removeClientFromQueue = async (time: string, fileName: string) => {
    const data = await readFromStorage(fileName);
    const json: DataInterface = JSON.parse(data);

    delete json[time];
    
    const response = await writeToStorage(fileName, json)
}

// edit person in queue
const editClientInQueue = async (time: string, fileName: string, newData: FormDataInterface) => {
    const data = await readFromStorage(fileName);
    const json: DataInterface = JSON.parse(data);

    json[time] = newData;
    
    const response = await writeToStorage(fileName, json)
}

// edit person in queue on both files
export const editClientInQueueOnBothFiles = async (time: string, fileName: string, newData: FormDataInterface) => {
    const response = await editClientInQueue(time, fileName, newData);
    const response2 = await editClientInQueue(time, `my${fileName}`, newData);
}