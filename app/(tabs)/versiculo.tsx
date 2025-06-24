import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function VersiculoScreen() {
  const versiculoHoje = {
    texto: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais.",
    referencia: "Jeremias 29:11",
    data: "20 de Janeiro de 2025",
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
        <Text style={styles.title}>Versículo do Dia</Text>
        <Text style={styles.date}>{versiculoHoje.data}</Text>
        
        <View style={styles.versiculoCard}>
          <Text style={styles.versiculoText}>"{versiculoHoje.texto}"</Text>
          <Text style={styles.referencia}>{versiculoHoje.referencia}</Text>
        </View>

        <View style={styles.reflexaoContainer}>
          <Text style={styles.reflexaoTitle}>Reflexão</Text>
          <Text style={styles.reflexaoText}>
            Deus tem os melhores planos para nossa vida. Mesmo quando não conseguimos enxergar o futuro claramente, podemos confiar que Ele está trabalhando em nosso favor. Seus pensamentos sobre nós são de esperança, restauração e bênção.
          </Text>
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
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
  versiculoCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#005f40',
  },
  versiculoText: {
    fontSize: 18,
    color: '#333333',
    lineHeight: 26,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
  },
  referencia: {
    fontSize: 16,
    color: '#005f40',
    fontWeight: '600',
    textAlign: 'right',
  },
  reflexaoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  reflexaoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#005f40',
    marginBottom: 12,
  },
  reflexaoText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
});