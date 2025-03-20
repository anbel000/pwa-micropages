import React, { useState, useEffect } from 'react';
import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter
} from 'framework7-react';

import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isInstallable, setIsInstallable] = useState(false); // Estado para mostrar el botón de instalación
  const [errorMessage, setErrorMessage] = useState(null); // Estado para mostrar errores
  let deferredPrompt; // Guardamos el evento para usarlo más tarde

  // Framework7 Parameters
  const f7params = {
    name: 'micropages-app',
    theme: 'auto',
    colors: {
      primary: '#36328e',
    },
    darkMode: true,
    store: store,
    routes: routes,
  };

  const alertLoginData = () => {
    f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
      f7.loginScreen.close();
    });
  };

  // Escuchar el evento beforeinstallprompt y manejar la instalación
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Previene que el navegador muestre el banner de instalación por defecto
      e.preventDefault();
      // Guardar el evento para usarlo más tarde
      deferredPrompt = e;
      // Permitir que la app sea instalable
      setIsInstallable(true);
    };

    // Escuchar el evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detectar si la PWA no puede ser instalada (si no es soportada por el navegador)
    if (!window.matchMedia('(display-mode: standalone)').matches) {
      setErrorMessage('Tu navegador no soporta la instalación de aplicaciones PWA o no cumple los requisitos necesarios.');
    }

    return () => {
      // Limpiar el event listener cuando el componente se desmonte
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Función para manejar la instalación cuando el usuario hace clic en el botón
  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Mostrar el prompt de instalación
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuario aceptó la instalación');
        } else {
          console.log('Usuario rechazó la instalación');
        }
        // Limpiar el evento
        deferredPrompt = null;
      });
    }
  };

  f7ready(() => {
    // Call F7 APIs here
  });

  return (
    <App {...f7params}>
      {/* Left panel with cover effect */}
      <Panel left cover dark>
        <View>
          <Page>
            <Navbar title="Left Panel" />
            <Block>Left panel content goes here</Block>
          </Page>
        </View>
      </Panel>

      {/* Right panel with reveal effect */}
      <Panel right reveal dark>
        <View>
          <Page>
            <Navbar title="Right Panel" />
            <Block>Right panel content goes here</Block>
          </Page>
        </View>
      </Panel>

      {/* Views/Tabs container */}
      <Views tabs className="safe-areas">
        {/* Tabbar for switching views-tabs */}
        <Toolbar tabbar icons bottom>
          <Link tabLink="#view-home" tabLinkActive iconIos="f7:house_fill" iconMd="material:home" text="Home" />
          <Link tabLink="#view-catalog" iconIos="f7:square_list_fill" iconMd="material:view_list" text="Catalog" />
          <Link tabLink="#view-settings" iconIos="f7:gear" iconMd="material:settings" text="Settings" />
        </Toolbar>

        {/* Your main view/tab */}
        <View id="view-home" main tab tabActive url="/" />
        <View id="view-catalog" name="catalog" tab url="/catalog/" />
        <View id="view-settings" name="settings" tab url="/settings/" />
      </Views>

      {/* Botón de instalación */}
      {isInstallable && (
        <button
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: '#36328e',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={handleInstallClick}
        >
          Instalar
        </button>
      )}

      {/* Mensaje de error si la instalación no es posible */}
      {errorMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '20px',
            padding: '10px 20px',
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '5px',
            zIndex: 9999,
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Popup */}
      <Popup id="my-popup">
        <View>
          <Page>
            <Navbar title="Popup">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p>Popup content goes here.</p>
            </Block>
          </Page>
        </View>
      </Popup>

      <LoginScreen id="my-login-screen">
        <View>
          <Page loginScreen>
            <LoginScreenTitle>Login</LoginScreenTitle>
            <List form>
              <ListInput
                type="text"
                name="username"
                placeholder="Your username"
                value={username}
                onInput={(e) => setUsername(e.target.value)}
              />
              <ListInput
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />
            </List>
            <List>
              <ListButton title="Sign In" onClick={() => alertLoginData()} />
              <BlockFooter>
                Some text about login information.<br />Click "Sign In" to close Login Screen
              </BlockFooter>
            </List>
          </Page>
        </View>
      </LoginScreen>
    </App>
  );
};

export default MyApp;
