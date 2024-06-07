import { useEffect, useState } from 'react';
import { useConnect, useAccount, useEnsName, useDisconnect, useEnsAvatar } from 'wagmi';
import { Popover, Radio, Modal, message, Flex } from 'antd';
import { ArrowDownOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Box, Text, Input, InputGroup, InputRightAddon, Image, Button, InputRightElement } from '@chakra-ui/react';
import tokenList from '../assets/tokenList.json';
import axios from 'axios';

const SwapPage = () => {
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

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
    setIsOpen(true);
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
    setIsOpen(false);
  }

  async function fetchPrices(one, two) {
    const res = await axios.get(`http://localhost:3001/tokenPrice`, {
      params: { addressOne: one, addressTwo: two },
    });

    console.log(res.data);
    setPrices(res.data);
  }

  useEffect(() => {
    fetchPrices(tokenList[0]?.address, tokenList[1]?.address);
  }, []);

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
    <Box color="black" display="flex" flexDir="column" gap="20px">
      <Box display="flex" gap="20px">
        {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
        {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
        {connectors.map((connector) => (
          <Button onClick={() => connect({ connector })} bg="green.300">
            {connector.name}
          </Button>
        ))}
        <Button onClick={() => disconnect()} bg="red.300">
          Disconnect
        </Button>
      </Box>
      <>
        <Modal open={isOpen} footer={null} onCancel={() => setIsOpen(false)} title="Select a token">
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
        <Box bg="#e8a7e7" p="20px" w="50vw" h="40vh" rounded="30">
          <Box className="tradeBoxHeader">
            <Text mt="20px" ml="20px" fontSize="30px">
              Swap
            </Text>
            <Popover title="Settings" trigger="click" placement="bottomRight" content={settings}>
              <SettingOutlined className="cog" />
            </Popover>
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
                    ml="-70px"
                    justifyContent="center"
                    mt="25px"
                    p="5px"
                    background="grey"
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
                    ml="-70px"
                    justifyContent="center"
                    mt="25px"
                    p="5px"
                    background="grey"
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
            <Box
              width="100%"
              display="flex"
              position="absolute"
              justifyContent="center"
              cursor="pointer"
              onClick={switchTokens}
              mt="5vh"
              pr="40px"
            >
              <Box
                boxSize="50px"
                bg="grey"
                display="flex"
                justifyContent="center"
                alignItems="center"
                rounded="10"
                pl="1px"
              >
                <ArrowDownOutlined></ArrowDownOutlined>
              </Box>
            </Box>
            <Box display="flex" justifyContent="center">
              <Button isDisabled={!tokenOneAmount || !isConnected} height="50px" width="100px" onClick={performSwap}>
                Swap
              </Button>
            </Box>
          </Box>
        </Box>
      </>
    </Box>
  );
};

export default SwapPage;
