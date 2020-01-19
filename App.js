import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection'
])

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content"/>
      <Routes />
    </>
  );
}
