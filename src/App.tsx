import React from 'react';

import Signin from './pages/Signin';
import Signup from './pages/Signup';

import GlobalStyle from './styles/global';

import AppProvider from './context';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AppProvider>
      <Signin />
    </AppProvider>
  </>
);

export default App;
