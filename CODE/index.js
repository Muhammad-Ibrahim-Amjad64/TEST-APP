/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AuthContextProvider from './src/store/auth-context';

const RootComponent = () => (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );

AppRegistry.registerComponent(appName, () => RootComponent);
