// import { writeToStorage, readFromStorage, fileExistsInStorage } from '../utils/fileManagement';
// import 

// // Example data for testing
// const testData = {
//   name: 'John Doe',
//   age: 30,
// };

// describe('FileUtils', () => {
//   const fileName = 'testFile';

//   afterEach(async () => {
//     // Clean up the test file after each test
//     await FileSystem.deleteAsync(FileSystem.documentDirectory + fileName + '.json');
//   });

//   it('should write data to storage', async () => {
//     // Write the test data to storage
//     await writeToStorage(fileName, testData);

//     // Read the data from storage
//     const storedData = await readFromStorage(fileName);

//     // Convert the stored data back to an object
//     const parsedData = JSON.parse(storedData);

//     // Assert that the data matches the original test data
//     expect(parsedData).toEqual(testData);
//   });

//   it('should read data from storage', async () => {
//     // Write the test data to storage
//     await writeToStorage(fileName, testData);

//     // Read the data from storage
//     const storedData = await readFromStorage(fileName);

//     // Assert that the data matches the original test data
//     expect(storedData).toEqual(JSON.stringify(testData));
//   });

//   it('should check if file exists in storage', async () => {
//     // Write the test data to storage
//     await writeToStorage(fileName, testData);

//     // Check if the file exists
//     const exists = await fileExistsInStorage(fileName);

//     // Assert that the file exists
//     expect(exists).toBe(true);
//   });

//   it('should return false for non-existing file', async () => {
//     // Check if the file exists
//     const exists = await fileExistsInStorage(fileName);

//     // Assert that the file does not exist
//     expect(exists).toBe(false);
//   });
// });
