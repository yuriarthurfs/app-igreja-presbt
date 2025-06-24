// lib/firebase.ts

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyCkTMcAAlx_Jp5xLTcZFrf7uRtczSuBm8c',
  authDomain: 'igreja-presb.firebaseapp.com',
  projectId: 'igreja-presb',
  storageBucket: 'igreja-presb.appspot.com',
  messagingSenderId: '253958680729',
  appId: '1:253958680729:web:77a0285fe9d3eb60bb8808',
};

// Inicialize o app uma única vez
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inicialize o auth com persistência (somente se ainda não estiver inicializado)
let auth;

if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (e) {
    // initializeAuth só pode ser chamado uma vez — se já foi, use getAuth
    auth = getAuth(app);
  }
}

export { app, auth };
