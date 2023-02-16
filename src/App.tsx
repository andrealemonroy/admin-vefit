import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from 'styled-components';
import { Theme } from './components/atoms/theme';
import { Toast } from './components/molecules/Toast';
import RouteNavigator from './RouteNavigator';
import { store } from './redux/store';

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
      redirectUri={window.location.origin}
    >
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <RouteNavigator />
          <Toast/>
        </ThemeProvider>
      </Provider>
    </Auth0Provider>
  );
}

export default App;
