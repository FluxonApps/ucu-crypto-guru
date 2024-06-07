import React, { useEffect, useState } from 'react';
import { useConnect, useAccount, useEnsName, useDisconnect, useEnsAvatar } from 'wagmi';
import { Popover, Radio, message, Flex, Modal } from 'antd';
import { ArrowDownOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputRightAddon,
  Image,
  Button,
  InputRightElement,
  useToast,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal as ModalChakra,
} from '@chakra-ui/react';

import tokenList from '../assets/tokenList.json';
import axios from 'axios';

const SwapPage = () => {
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpenSlippage, setIsOpenSlippage] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();
  const { data: ensName } = useEnsName({ address });
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const toast = useToast();

  const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />;

  const OverlayTwo = () => <ModalOverlay bg="none" backdropFilter="auto" backdropInvert="80%" backdropBlur="2px" />;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if (e.target.value && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2));
    } else {
      setTokenTwoAmount(null);
    }
  }

  function switchTokens() {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    console.log(tokenOneAmount);
    console.log(tokenTwoAmount);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two?.address, one?.address);
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpenSlippage(true);
  }

  function modifyToken(index) {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(tokenList[index]);
      fetchPrices(tokenList[index]?.address, tokenTwo?.address);
    } else {
      setTokenTwo(tokenList[index]);
      fetchPrices(tokenOne?.address, tokenList[index]?.address);
    }
    setIsOpenSlippage(false);
  }

  function performSwap() {}

  async function fetchPrices(one, two) {
    const res = await axios.get(`http://52.59.246.61:3001/tokenPrice`, {
      params: { addressOne: one, addressTwo: two },
    });
    console.log(res.data);
    setPrices(res.data);
  }

  useEffect(() => {
    fetchPrices(tokenList[0]?.address, tokenList[1]?.address);
  }, []);

  useEffect(() => {
    if (isConnected) {
      toast({ status: 'success', description: 'Successfully connected a wallet!', isClosable: true });
    }
  }, [isConnected]);

  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

  return (
    <>
      <ModalChakra isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader color="black">The transaction is successfull</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text></Text>
            <Text>
              You swapped: {tokenOneAmount} {tokenOne?.name}
            </Text>
            <Text>
              You received: {tokenTwoAmount} {tokenTwo?.name}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </ModalChakra>
      <Box
        color="black"
        display="flex"
        flexDir="column"
        gap="20px"
        height="100%"
        pb="50px"
        alignItems="center"
        justifyContent="center"
      >
        <Box display="flex" gap="20px">
          {connectors.map((connector, index) => {
            if (index === 0) {
              return (
                <Button isDisabled={isConnected} onClick={() => connect({ connector })} bg="green.300">
                  Connect Wallet
                </Button>
              );
            }
          })}
          <Button
            isDisabled={!isConnected}
            onClick={() => {
              disconnect();
              toast({ status: 'info', description: 'Successfully disconnected a wallet!' });
            }}
            bg="red.300"
          >
            Disconnect Wallet
          </Button>
        </Box>
        {isConnected ? <Text>Your wallet address is:</Text> : <Box></Box>}

        {address && <Box mt="-20px">{ensName ? `${ensName} (${address})` : address}</Box>}
        <>
          <Modal open={isOpenSlippage} footer={null} onCancel={() => setIsOpenSlippage(false)} title="Select a token">
            <Box display="flex" flexDirection="column" gap="5px">
              {tokenList?.map((e, i) => {
                return (
                  <Box
                    key={i}
                    onClick={() => modifyToken(i)}
                    display="flex"
                    bg="#e6e7e8"
                    p="10px"
                    py="20px"
                    border="1px solid grey"
                    cursor="pointer"
                    rounded="20"
                    _hover={{ bg: '#bbbcbd', transition: '0.5s ease' }}
                  >
                    <Image src={e.img} alt={e.ticker} className="tokenLogo"></Image>
                    <Box>
                      <Box className="tokenName">{e.name}</Box>
                      <Box className="tokenTicker">{e.ticker}</Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Modal>
          <Box
            bg="#e8a7e7"
            p="20px"
            w={{ base: '400px', lg: '700px' }}
            h="450px"
            rounded="30"
            border="4px solid purple"
          >
            <Box className="tradeBoxHeader" display="flex" alignItems="end">
              <Text mt="20px" ml="20px" fontSize="30px" color="white" fontWeight="bold">
                Swap your tokens
              </Text>
              <Box mb="10px" mr="10px">
                <Popover trigger="click" placement="bottomRight" content={settings}>
                  <SettingOutlined className="cog" />
                </Popover>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDir="column"
              padding="5"
              gap="5"
              width="100%"
              height="100%"
              mt="40px"
              position="relative"
            >
              <Box>
                <InputGroup>
                  <Input
                    placeholder="0"
                    value={!tokenOneAmount ? '' : tokenOneAmount}
                    onChange={changeAmount}
                    // width="100%"
                    height="70px"
                    bg="#f2f0f2"
                    fontSize="30px"
                    color="black"
                    fontWeight="bold"
                    type="number"
                    disabled={!prices}
                  ></Input>
                  <InputRightElement>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="5px"
                      ml="-90px"
                      justifyContent="center"
                      mt="25px"
                      p="5px"
                      background="white"
                      border="2px solid purple"
                      rounded="20px"
                      cursor="pointer"
                      onClick={() => openModal(1)}
                    >
                      <Image src={tokenOne.img} boxSize="30px"></Image>
                      {tokenOne.ticker}
                      <DownOutlined />
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </Box>

              <Box>
                <InputGroup>
                  <Input
                    placeholder="0"
                    value={!tokenTwoAmount ? '' : tokenTwoAmount}
                    disabled={true}
                    width="100%"
                    height="70px"
                    bg="#f2f0f2"
                    fontSize="30px"
                    cursor="pointer"
                    type="number"
                    color="black"
                    fontWeight="bold"
                  />
                  <InputRightElement>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="5px"
                      ml="-90px"
                      justifyContent="center"
                      mt="25px"
                      p="5px"
                      background="white"
                      border="2px solid purple"
                      rounded="20px"
                      onClick={() => openModal(2)}
                    >
                      <Image src={tokenTwo.img} boxSize="30px"></Image>
                      {tokenTwo.ticker}
                      <DownOutlined />
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box width="100%" display="flex" position="absolute" justifyContent="center" mt="63px" pr="40px">
                <Box
                  border="2px solid purple"
                  boxSize="40px"
                  bg="white"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  rounded="10"
                  pl="1px"
                  cursor="pointer"
                  onClick={switchTokens}
                  _hover={{ bg: '#bfbfbf', borderRadius: '10px', transition: '0.5s ease' }}
                >
                  <ArrowDownOutlined></ArrowDownOutlined>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center">
                <Button
                  isDisabled={!tokenOneAmount || !isConnected}
                  height="50px"
                  width="100%"
                  rounded="20px"
                  h="60px"
                  fontSize="25px"
                  fontFamily="monospace"
                  color="#d986d7"
                  onClick={() => {
                    setOverlay(<OverlayTwo />);
                    onOpen();
                  }}
                >
                  Swap
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      </Box>
    </>
  );
};

export default SwapPage;
