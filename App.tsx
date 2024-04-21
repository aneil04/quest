import 'react-native-gesture-handler';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserStack from './stacks/userStack';
import { AuthProvider } from './contexts/AuthContext';
import QuestUpload from './pages/questUpload';
import { QuestProvider } from './contexts/QuestContext';
import AuthPage from './pages/auth';

type AppStackParamList = {
  Auth: undefined;
  UserStack: undefined;
  QuestUpload: undefined;
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <QuestProvider>
          <NavigationContainer>
            <AppStack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false, gestureEnabled: true }}>
              <AppStack.Screen name="Auth" component={AuthPage} />
              <AppStack.Screen name="UserStack" component={UserStack} />
              <AppStack.Screen name="QuestUpload" component={QuestUpload} />
            </AppStack.Navigator>
          </NavigationContainer>
        </QuestProvider>
      </AuthProvider>
    </GluestackUIProvider>
  );
}