import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserStack from './stacks/userStack';
import { AuthProvider } from './contexts/AuthContext';

const AppStack = createNativeStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <NavigationContainer>
          <AppStack.Navigator initialRouteName="User Stack" screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <AppStack.Screen name="User Stack" component={UserStack} />
          </AppStack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </GluestackUIProvider>
  );
}