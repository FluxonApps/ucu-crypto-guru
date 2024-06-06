import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';
import { configureChains, mainnet, WagmiProvider, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/connectors'

const { provider, webSocketProvider } = configureChains([mainnet], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

// Render the application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider client={client}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
