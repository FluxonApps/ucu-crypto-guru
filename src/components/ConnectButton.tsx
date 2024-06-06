import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { ethers } from 'ethers';

const ConnectButton = ({ setSigner }) => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setConnected(false);
      setAccount('');
    } else {
      setConnected(true);
      setAccount(accounts[0]);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
        setConnected(true);
        setSigner(provider.getSigner());
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this app.');
    }
  };

  return (
    <Button onClick={connectWallet} colorScheme="purple">
      {connected ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect MetaMask'}
    </Button>
  );
};

export default ConnectButton;
