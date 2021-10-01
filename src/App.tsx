import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/Auth';
import { Routes } from './routes/Routes';
import { GlobalStyle } from './styles/global';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
