import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
// import { configureChains, mainnet, WagmiConfig, createClient } from 'wagmi';
// import { publicProvider } from '@wagmi/core/providers/public';
import { App } from './App';
import './index.css';

// Configure chains and providers
// const { provider, webSocketProvider } = configureChains([mainnet], [publicProvider()]);

// // Create Wagmi client
// const client = createClient({
//   autoConnect: true,
//   provider,
//   webSocketProvider,
// });

// Render the application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <WagmiConfig client={client}> */}
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
    {/* </WagmiConfig> */}
  </React.StrictMode>,
);
