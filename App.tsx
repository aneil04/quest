import 'react-native-gesture-handler';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import UserStack from './stacks/userStack';
import { AuthProvider } from './contexts/AuthContext';
import CameraScreen from './pages/cameraScreen';

type AppStackParamList = {
  UserStack: undefined;
  CameraScreen: undefined;
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <NavigationContainer>
          <AppStack.Navigator initialRouteName="UserStack" screenOptions={{ headerShown: false, gestureEnabled: true }}>
            <AppStack.Screen name="UserStack" component={UserStack} />
            <AppStack.Screen name="CameraScreen" component={CameraScreen} />
          </AppStack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </GluestackUIProvider>
  );
}