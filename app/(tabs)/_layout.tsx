import { Tabs } from 'expo-router';
import { Chrome as Home, Calendar, Heart, Book, Bell, UserCheck } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e5e5',
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: '#005f40',
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendario"
        options={{
          title: 'Calendário',
          tabBarIcon: ({ size, color }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pedido-oracao"
        options={{
          title: 'Oração',
          tabBarIcon: ({ size, color }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="versiculo"
        options={{
          title: 'Versículo',
          tabBarIcon: ({ size, color }) => (
            <Book size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="avisos"
        options={{
          title: 'Avisos',
          tabBarIcon: ({ size, color }) => (
            <Bell size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: 'Admin',
          tabBarIcon: ({ size, color }) => (
            <UserCheck size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}