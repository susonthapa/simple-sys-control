import React from 'react';
import { Provider } from 'react-native-paper';
import HomeScreen from './src/presentation/home/Home';

export default function App() {
  return (
    <Provider>
      <HomeScreen />
    </Provider>
  );
}