import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import Routes from '../router/routes'; 

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
          const response = await axios.post('http://10.0.2.2:8080/api/v1/auth/authenticate', {
            username,
            password,
          });
      
          const token = response.data['jwt-token'];
    
          await AsyncStorage.setItem('jwt-token', token);
      
          const decoded = jwtDecode(token);
          if (decoded.roles.includes('ROLE_ADMIN')) {
            navigation.navigate(Routes.AdminDashboard);
          } else if (decoded.roles.includes('ROLE_TEACHER')) {
            navigation.navigate(Routes.TeacherDashboard);
          } else if (decoded.roles.includes('ROLE_PUPIL')) {
            navigation.navigate(Routes.PupilDashboard);
          } else if (decoded.roles.includes('ROLE_PARENT')) {
            navigation.navigate(Routes.ParentDashboard);
          }
        } catch (err) {
          setError('Неправильное имя пользователя или пароль');
        }
      };

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcRHrntmuwzh08jmKFBR0hzuD3H8i3_GZl3Q&s' }} style={styles.logo} />
            <Text style={styles.title}>Добро пожаловать</Text>
            <TextInput
                style={styles.input}
                placeholder="Имя пользователя"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#aaa"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
            <Text style={styles.footer}>© 2024 Electronic journal school</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#4caf50',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
        fontSize: 12,
        color: '#aaa',
    },
});

export default LoginScreen;
