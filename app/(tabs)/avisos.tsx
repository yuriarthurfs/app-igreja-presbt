import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function AvisosScreen() {
  const avisos = [
    {
      id: 1,
      titulo: "Culto Especial de Gratidão",
      data: "25 de Janeiro",
      conteudo: "Teremos um culto especial de gratidão no próximo domingo às 19h. Venha participar deste momento de louvor e ação de graças.",
      prioridade: "alta",
    },
    {
      id: 2,
      titulo: "Retiro Espiritual",
      data: "01 de Fevereiro",
      conteudo: "Inscrições abertas para o retiro espiritual que acontecerá nos dias 15 e 16 de fevereiro. Vagas limitadas.",
      prioridade: "media",
    },
    {
      id: 3,
      titulo: "Grupo de Estudos",
      data: "Toda terça",
      conteudo: "Nosso grupo de estudos bíblicos acontece todas as terças-feiras às 19h30. Todos são bem-vindos!",
      prioridade: "baixa",
    },
  ];

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta':
        return '#e74c3c';
      case 'media':
        return '#f39c12';
      case 'baixa':
        return '#27ae60';
      default:
        return '#005f40';
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
        <Text style={styles.title}>Avisos da Igreja</Text>
        
        <View style={styles.avisosList}>
          {avisos.map((aviso) => (
            <View key={aviso.id} style={styles.avisoCard}>
              <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(aviso.prioridade) }]} />
              <View style={styles.avisoContent}>
                <Text style={styles.avisoTitulo}>{aviso.titulo}</Text>
                <Text style={styles.avisoData}>{aviso.data}</Text>
                <Text style={styles.avisoTexto}>{aviso.conteudo}</Text>
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
  avisosList: {
    flex: 1,
  },
  avisoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
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
    flexDirection: 'row',
    overflow: 'hidden',
  },
  priorityIndicator: {
    width: 4,
  },
  avisoContent: {
    flex: 1,
    padding: 16,
  },
  avisoTitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  avisoData: {
    fontSize: 12,
    color: '#005f40',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  avisoTexto: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});