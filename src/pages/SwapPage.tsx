import React, { useState } from 'react';
import { Box, Button, Flex, Input, NumberInput, NumberInputField, Select, Text, VStack } from '@chakra-ui/react';
import ConnectButton from '../components/ConnectButton';
import Swap from '../components/Swap';
import Header from '../components/Header';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useConnect, useAccount } from 'wagmi';

const SwapPage = () => {
  const [inputToken, setInputToken] = useState('ETH');
  const [outputToken, setOutputToken] = useState('DAI');
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const [signer, setSigner] = useState(null);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  const handleSwap = () => {
    console.log(`Swapping ${inputAmount} ${inputToken} to ${outputAmount} ${outputToken}`);
  };

  return (
    <Box>
      <Header />
      <Swap />
    </Box>
  );
};

export default SwapPage;
