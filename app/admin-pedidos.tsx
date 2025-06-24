import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Trash2, Check, ArrowLeft, LogOut } from 'lucide-react-native';
import { supabase, PrayerRequest } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminPedidosScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [pedidos, setPedidos] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace('/admin-login');
      return;
    }
    fetchPedidos();
  }, [user]);

  const fetchPedidos = async () => {
    try {
      const { data, error } = await supabase
        .from('prayer_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPedidos(data || []);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os pedidos.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPedidos();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleExcluir = (id: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este pedido?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('prayer_requests')
                .delete()
                .eq('id', id);

              if (error) {
                throw error;
              }

              setPedidos(pedidos.filter(p => p.id !== id));
            } catch (error) {
              console.error('Erro ao excluir pedido:', error);
              Alert.alert('Erro', 'Não foi possível excluir o pedido.');
            }
          },
        },
      ]
    );
  };

  const handleMarcarLido = async (id: string) => {
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return;

    try {
      const { error } = await supabase
        .from('prayer_requests')
        .update({ is_read: !pedido.is_read })
        .eq('id', id);

      if (error) {
        throw error;
      }

      setPedidos(pedidos.map(p => 
        p.id === id ? { ...p, is_read: !p.is_read } : p
      ));
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o pedido.');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          onPress: async () => {
            try {
              await logout();
              router.replace('/admin-login');
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
            }
          },
        },
      ]
    );
  };

  const handleVoltar = () => {
    router.back();
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#005f40" />
        <Text style={styles.loadingText}>Carregando pedidos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
          <ArrowLeft size={24} color="#005f40" />
        </TouchableOpacity>
        <Text style={styles.title}>Pedidos de Oração</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={24} color="#005f40" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {pedidos.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum pedido de oração encontrado.</Text>
            <Text style={styles.emptySubtext}>
              Os pedidos enviados pelos fiéis aparecerão aqui.
            </Text>
          </View>
        ) : (
          pedidos.map((pedido) => (
            <View key={pedido.id} style={[styles.pedidoCard, pedido.is_read && styles.pedidoLido]}>
              <View style={styles.pedidoHeader}>
                <Text style={styles.pedidoNome}>{pedido.name}</Text>
                <Text style={styles.pedidoData}>{formatDate(pedido.created_at)}</Text>
              </View>
              
              <Text style={styles.pedidoTexto}>{pedido.request}</Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.readButton]}
                  onPress={() => handleMarcarLido(pedido.id)}
                >
                  <Check size={16} color="#ffffff" />
                  <Text style={styles.buttonText}>
                    {pedido.is_read ? 'Não lido' : 'Lido'}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleExcluir(pedido.id)}
                >
                  <Trash2 size={16} color="#ffffff" />
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    padding: 8,
  },
  logoutButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  pedidoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
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
    borderLeftWidth: 4,
    borderLeftColor: '#005f40',
  },
  pedidoLido: {
    backgroundColor: '#f8f9fa',
    borderLeftColor: '#cccccc',
  },
  pedidoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pedidoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  pedidoData: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 12,
  },
  pedidoTexto: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  readButton: {
    backgroundColor: '#005f40',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});