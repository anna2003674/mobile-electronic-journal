import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import Routes from '../router/routes';

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('jwt-token');
      if (!token) {
        navigation.navigate(Routes.Login);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.roles && decoded.roles.includes('ADMIN')) {
          navigation.navigate(Routes.AdminDashboard);
        } else if (decoded.roles && decoded.roles.includes('ROLE_TEACHER')) {
          navigation.navigate(Routes.TeacherDashboard);
        } else if (decoded.roles && decoded.roles.includes('ROLE_PUPIL')) {
          navigation.navigate(Routes.PupilDashboard);
        } else if (decoded.roles && decoded.roles.includes('ROLE_PARENT')) {
          navigation.navigate(Routes.ParentDashboard);
        } else {
          navigation.navigate(Routes.Login);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        navigation.navigate(Routes.Login); 
      }
    };

    checkAuth();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default AuthLoadingScreen;