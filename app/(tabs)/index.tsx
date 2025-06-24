import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Heart, Book, MapPin, Bell, UserCheck } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();

  const menuItems = [
    {
      icon: Calendar,
      title: 'Calendário',
      subtitle: 'Eventos e cultos',
      route: '/(tabs)/calendario',
    },
    {
      icon: Heart,
      title: 'Pedido de Oração',
      subtitle: 'Envie seu pedido',
      route: '/(tabs)/pedido-oracao',
    },
    {
      icon: Book,
      title: 'Versículo do Dia',
      subtitle: 'Palavra diária',
      route: '/(tabs)/versiculo',
    },
    {
      icon: MapPin,
      title: 'Informações da Igreja',
      subtitle: 'Localização e contato',
      action: () => Alert.alert('Informações da Igreja', 'Rua Exemplo, 123\nJuiz de Fora - MG\nTelefone: (32) 3333-4444'),
    },
    {
      icon: Bell,
      title: 'Avisos',
      subtitle: 'Comunicados importantes',
      route: '/(tabs)/avisos',
    },
    {
      icon: UserCheck,
      title: 'Acesso Administrador',
      subtitle: 'Login para admin',
      route: '../../admin-login',
    },
  ];

  const handleMenuPress = (item: any) => {
    if (item.action) {
      item.action();
    } else if (item.route) {
      router.push(item.route);
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
        <Text style={styles.greeting}>Bem-vindo(a)!</Text>
      </View>

      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item)}
          >
            <View style={styles.iconContainer}>
              <item.icon size={32} color="#005f40" />
            </View>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        ))}
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
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  logoImage: {
    width: 600,
    height: 600,
    marginBottom: -230, // "empurra" os textos para cima
    marginTop: -230, // opcional: aproxima do topo
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
  greeting: {
    fontSize: 18,
    color: '#333333',
    marginTop: 20,
    fontWeight: '600',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  iconContainer: {
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
});