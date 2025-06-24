import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function InitialScreen() {
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Mostrar o botão após 2 segundos para simular splash screen
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/2_20250522_175609_0000_green.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>2ª IGREJA</Text>
        <Text style={styles.logoText}>PRESBITERIANA</Text>
        <Text style={styles.logoSubText}>JUIZ DE FORA</Text>
      </View>
      
      {showButton && (
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoImage: {
    width: 360,
    height: 360,
    marginBottom: -60, // "empurra" os textos para cima
    marginTop: -60, // opcional: aproxima do topo
    zIndex: 1,
    tintColor: '#005f40',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#005f40',
    textAlign: 'center',
    letterSpacing: 1,
  },
  logoSubText: {
    fontSize: 16,
    color: '#005f40',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#005f40',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});