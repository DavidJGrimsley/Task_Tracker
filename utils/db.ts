// import { Platform } from 'react-native';
// import * as SQLite from 'expo-sqlite';

// const getDB = () => {
//   if (Platform.OS === 'web') {
//     console.warn('SQLite is not supported on the web. Using a mock database.');
//     return {
//       transaction: () => ({
//         executeSql: (query: string, args: any[], success: Function, error: Function) => {
//           console.warn('Mock executeSql called:', query, args);
//           success && success({ rows: { _array: [] } });
//         },
//       }),
//     };
//   }
//   return SQLite.openDatabase('app.db');
// };

// export const db = getDB();