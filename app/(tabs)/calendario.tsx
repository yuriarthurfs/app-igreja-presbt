import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function CalendarioScreen() {
  const eventos = [
    {
      data: '2025-01-20',
      dia: 'Domingo',
      titulo: 'Culto Matutino',
      horario: '09:00',
      local: 'Templo Principal',
    },
    {
      data: '2025-01-20',
      dia: 'Domingo',
      titulo: 'Escola Dominical',
      horario: '10:30',
      local: 'Salas de Aula',
    },
    {
      data: '2025-01-22',
      dia: 'Terça-feira',
      titulo: 'Estudo Bíblico',
      horario: '19:30',
      local: 'Salão de Eventos',
    },
    {
      data: '2025-01-24',
      dia: 'Quinta-feira',
      titulo: 'Culto de Oração',
      horario: '19:30',
      local: 'Templo Principal',
    },
  ];

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
        <Text style={styles.title}>Calendário de Eventos</Text>
        
        <View style={styles.eventsList}>
          {eventos.map((evento, index) => (
            <View key={index} style={styles.eventCard}>
              <View style={styles.dateContainer}>
                <Text style={styles.eventDay}>{evento.dia}</Text>
                <Text style={styles.eventDate}>{evento.data}</Text>
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{evento.titulo}</Text>
                <Text style={styles.eventTime}>{evento.horario}</Text>
                <Text style={styles.eventLocation}>{evento.local}</Text>
              </View>
            </View>
          ))}
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
    marginBottom: -230, // "empurra" os textos para cima
    marginTop: -230, // opcional: aproxima do topo
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
    marginBottom: 30,
  },
  eventsList: {
    flex: 1,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
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
  dateContainer: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 80,
  },
  eventDay: {
    fontSize: 12,
    color: '#005f40',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  eventDate: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: '#005f40',
    fontWeight: '600',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666666',
  },
});