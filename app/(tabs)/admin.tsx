import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Lock } from 'lucide-react-native';

export default function AdminScreen() {
  const router = useRouter();

  const handleAdminLogin = () => {
    router.replace('../../admin-login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Lock size={64} color="#005f40" />
        </View>
        
        <Text style={styles.title}>Área Administrativa</Text>
        <Text style={styles.subtitle}>
          Esta área é restrita aos administradores da igreja.
        </Text>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleAdminLogin}>
          <Text style={styles.loginButtonText}>Fazer Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  loginButton: {
    backgroundColor: '#005f40',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 200,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});