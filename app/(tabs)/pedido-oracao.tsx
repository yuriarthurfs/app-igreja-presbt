import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function PedidoOracaoScreen() {
  const [nome, setNome] = useState('');
  const [pedido, setPedido] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEnviar = async () => {
    if (pedido.trim() === '') {
      Alert.alert('Atenção', 'Por favor, digite seu pedido de oração.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('prayer_requests')
        .insert([
          {
            name: nome.trim() || 'Anônimo',
            request: pedido.trim(),
            is_read: false,
          }
        ]);

      if (error) {
        throw error;
      }

      setEnviado(true);
      setNome('');
      setPedido('');

      setTimeout(() => {
        setEnviado(false);
      }, 3000);
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      Alert.alert('Erro', 'Não foi possível enviar seu pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/2_20250522_175431_0000_green.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Pedido de Oração</Text>
        <Text style={styles.subtitle}>
          Compartilhe conosco seus pedidos de oração. Nossa igreja estará orando por você.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Nome (opcional)</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            placeholderTextColor="#999999"
            editable={!loading}
          />

          <Text style={styles.label}>Pedido de Oração *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={pedido}
            onChangeText={setPedido}
            placeholder="Digite seu pedido de oração aqui..."
            placeholderTextColor="#999999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            editable={!loading}
          />

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleEnviar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Enviar Pedido</Text>
            )}
          </TouchableOpacity>

          {enviado && (
            <View style={styles.successMessage}>
              <Text style={styles.successText}>
                ✓ Seu pedido foi enviado com sucesso!
              </Text>
              <Text style={styles.successSubtext}>
                Nossa igreja estará orando por você.
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#005f40',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  logoSubText: {
    fontSize: 12,
    color: '#005f40',
    textAlign: 'center',
    marginTop: 2,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  form: {
    flex: 1,
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
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  button: {
    backgroundColor: '#005f40',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  successMessage: {
    backgroundColor: '#e8f5e8',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c3e6c3',
  },
  successText: {
    color: '#2d5a2d',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  successSubtext: {
    color: '#4d7a4d',
    fontSize: 14,
    textAlign: 'center',
  },
});