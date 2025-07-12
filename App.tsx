/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "./global.css"

import { NewAppScreen } from '@react-native/new-app-screen';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

import {
  Camera,
  PhotoRecognizer,
} from '@solutionsmedias360/react-native-vision-camera-text-recognition';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(()=>{
    console.log(123);

  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <NewAppScreen templateFileName="App.tsx" /> */}
      <Text style={{
        color: 'blue',
        fontSize: 20,
        fontWeight: '700'
      }}>123 zxc</Text>
      <Text>demo for camera</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 8,
    justifyContent: 'center'
  },
});

// Get-Process -Id (Get-NetTCPConnection -LocalPort 8081).OwningProcess

export default App;
