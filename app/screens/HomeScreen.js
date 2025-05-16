import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen = () => {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to Our App</Text>
        {user && <Text style={styles.userEmail}>{user.email}</Text>}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Items</Text>
        <View style={styles.placeholder}>
          <Text>Featured items will appear here</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.placeholder}>
          <Text>Categories will appear here</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Items</Text>
        <View style={styles.placeholder}>
          <Text>Recent items will appear here</Text>
        </View>
      </View>

      <View style={styles.logoutContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#ff6347" />
        ) : (
          <Button
            title="Logout"
            onPress={handleLogout}
            color="#ff6347"
            disabled={loading}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#4a80f5',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userEmail: {
    color: 'white',
    marginTop: 5,
  },
  section: {
    padding: 15,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeholder: {
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutContainer: {
    padding: 15,
    marginVertical: 10,
    minHeight: 50,
    justifyContent: 'center',
  }
});

export default HomeScreen; 