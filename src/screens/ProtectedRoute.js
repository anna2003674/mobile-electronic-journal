import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProtectedRoute = ({ role, children, navigation }) => {
  useEffect(() => {
    const checkRole = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt-token');
        if (token) {
          const decoded = jwtDecode(token);
          if (!decoded.roles.includes(role)) {
            navigation.navigate('Login');
          }
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Role check error:', error);
        navigation.navigate('Login');
      }
    };

    checkRole();
  }, [role, navigation]);

  return <>{children}</>;
};

export default ProtectedRoute;






