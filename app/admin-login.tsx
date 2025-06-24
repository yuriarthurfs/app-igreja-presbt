import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      router.push('../admin-pedidos');
    } catch (error: any) {
      let errorMessage = 'Erro ao fazer login. Tente novamente.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuário não encontrado.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Senha incorreta.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Muitas tentativas. Tente novamente mais tarde.';
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/2_20250522_175431_0000_green.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Acesso Administrador</Text>
        
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            placeholderTextColor="#999999"
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            placeholderTextColor="#999999"
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.loginButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.voltarButton} 
            onPress={handleVoltar}
            disabled={loading}
          >
            <Text style={styles.voltarButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Entre em contato com o administrador da igreja para obter suas credenciais de acesso.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  logoImage: {
    width: 600,
    height: 600,
    marginBottom: -230,
    marginTop: -230,
    zIndex: 1,
    tintColor: '#005f40',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005f40',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  logoSubText: {
    fontSize: 14,
    color: '#005f40',
    textAlign: 'center',
    marginTop: 2,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#005f40',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  voltarButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  voltarButtonText: {
    color: '#005f40',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});