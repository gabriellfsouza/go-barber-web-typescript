import React from 'react';
import Routes from './routes';

import GlobalStyle from './styles/global';

import AppProvider from './context';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AppProvider>
      <Routes />
    </AppProvider>
  </>
);

export default App;
