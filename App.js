import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import AdminDashboard from './src/pages/Admin/AdminDashboard';
import TeacherDashboard from './src/pages/Teacher/TeacherDashboard';
import PupilDashboard from './src/pages/Pupil/PupilDashboard';
import ParentDashboard from './src/pages/Parent/ParentDashboard';
import Routes from './src/router/routes';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.AuthLoading}>
        <Stack.Screen name={Routes.AuthLoading} component={AuthLoadingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={Routes.Login} component={LoginScreen} />
        <Stack.Screen name={Routes.AdminDashboard} component={AdminDashboard} />
        <Stack.Screen name={Routes.TeacherDashboard} component={TeacherDashboard} />
        <Stack.Screen name={Routes.PupilDashboard} component={PupilDashboard} />
        <Stack.Screen name={Routes.ParentDashboard} component={ParentDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
