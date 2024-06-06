import React, { useState } from 'react';
import { Box, Button, Flex, Input, NumberInput, NumberInputField, Select, Text, VStack } from '@chakra-ui/react';
// import ConnectButton from '../components/ConnectButton';
// import Swap from '../components/Swap';
// import Header from '../components/Header';
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
// import { useConnect, useAccount } from 'wagmi';

const SwapPage = () => {
  // const [inputToken, setInputToken] = useState('ETH');
  // const [outputToken, setOutputToken] = useState('DAI');
  // const [inputAmount, setInputAmount] = useState('');
  // const [outputAmount, setOutputAmount] = useState('');
  // const [signer, setSigner] = useState(null);

  // const { address, isConnected } = useAccount();
  // const { connect } = useConnect({
  //   connector: new MetaMaskConnector(),
  // });

  // const handleSwap = () => {
  //   // Handle the swap logic here
  //   console.log(`Swapping ${inputAmount} ${inputToken} to ${outputAmount} ${outputToken}`);
  // };

  return (
    <Box>
      {/* <Header connect={connect} isConnected={isConnected} address={address} />
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <Swap isConnected={isConnected} address={address} />
      </Box> */}
    </Box>

    // <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%">
    //   <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} width="30vw" mx="auto" color="black">
    //     <VStack spacing={4}>
    //       <ConnectButton setSigner={setSigner} />
    //       <Text fontSize="2xl" fontWeight="bold">
    //         Swap
    //       </Text>
    //       <Box width="100%">
    //         <Text>From</Text>
    //         <Flex>
    //           <Select value={inputToken} onChange={(e) => setInputToken(e.target.value)} width="30%">
    //             <option value="ETH">ETH</option>
    //             <option value="DAI">DAI</option>
    //             <option value="USDC">USDC</option>
    //           </Select>
    //           <NumberInput
    //             value={inputAmount}
    //             onChange={(valueString) => setInputAmount(valueString)}
    //             width="70%"
    //             ml={2}
    //           >
    //             <NumberInputField placeholder="0.0" />
    //           </NumberInput>
    //         </Flex>
    //       </Box>
    //       <Box width="100%">
    //         <Text>To</Text>
    //         <Flex>
    //           <Select value={outputToken} onChange={(e) => setOutputToken(e.target.value)} width="30%">
    //             <option value="DAI">DAI</option>
    //             <option value="ETH">ETH</option>
    //             <option value="USDC">USDC</option>
    //           </Select>
    //           <NumberInput
    //             value={outputAmount}
    //             onChange={(valueString) => setOutputAmount(valueString)}
    //             width="70%"
    //             ml={2}
    //           >
    //             <NumberInputField placeholder="0.0" />
    //           </NumberInput>
    //         </Flex>
    //       </Box>
    //       <Button colorScheme="purple" onClick={handleSwap} width="100%">
    //         Swap
    //       </Button>
    //     </VStack>
    //   </Box>
    // </Box>
  );
};

export default SwapPage;
