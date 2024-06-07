import { SearchIcon } from '@chakra-ui/icons';
import { getAuth, signOut } from 'firebase/auth';
import { Box, Image, Input, InputGroup, InputLeftElement, Text, IconButton, Button } from '@chakra-ui/react';
import { BsPersonFill } from 'react-icons/bs';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logoImage from '../../assets/main/token.png';
import blocksImage from '../../assets/main/blocks.png';
import statsImage from '../../assets/main/stats.png';
import swapIcon from '../../assets/main/swap.svg';
import { FC } from 'react';
import { BsPerson } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';

const MainStatsLayout = () => {
  const navigation = useNavigate();
  const auth = getAuth();
  console.log(auth);
  const logout = () => {
    signOut(auth)
      .then(() => {
        navigation('/');
      })
      .catch((error) => {});
  };

  return (
    <>
      <Box
        bg="linear-gradient(90deg, rgba(13,10,52,1) 0%, rgba(65,14,69,1) 100%)"
        color="white"
        minH="100vh"
        padding="4"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginLeft="10"
          marginRight="20"
          maxWidth="1450px"
          margin="0 auto"
          mt="20px"
          mb="30px"
        >
          <Box fontSize="2xl" fontWeight="bold">
            <Box alignItems="center" justifyContent="center" display="flex">
              <Image src={logoImage} display="inline-block" mr="4" boxSize="60px" />
              CryptoGuru
            </Box>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Link to="/main/blocks">
              <Box
                display="flex"
                cursor="pointer"
                padding="20px"
                mr="2"
                _hover={{ bg: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', transition: '0.5s ease' }}
              >
                <Image src={blocksImage} mr="10px" width="30px" height="30px"></Image>
                <Text display="inline-block" cursor="pointer" fontSize="20px">
                  Blocks
                </Text>
              </Box>
            </Link>

            <Link to="/main/stats">
              <Box
                display="flex"
                cursor="pointer"
                padding="20px"
                ml="2"
                _hover={{ bg: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', transition: '0.5s ease' }}
              >
                <Image src={statsImage} mr="10px" width="30px" height="30px"></Image>
                <Text display="inline-block" fontSize="20px">
                  Stats
                </Text>
              </Box>
            </Link>
            <Link to="/main/swap">
              <Box
                display="flex"
                cursor="pointer"
                padding="20px"
                ml="2"
                _hover={{ bg: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', transition: '0.5s ease' }}
              >
                <Image src={swapIcon} mr="10px" width="30px" height="30px"></Image>
                <Text display="inline-block" fontSize="20px">
                  Swap
                </Text>
              </Box>
            </Link>
            <Button
              display="flex"
              cursor="pointer"
              padding="20px"
              ml="2"
              variant="ghost"
              color={'white'}
              _hover={{ bg: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', transition: '0.5s ease', height: '60px' }}
              onClick={logout}
            >
              <CiLogout size="30px" />
            </Button>
          </Box>
        </Box>
        <Box background="#ffffff" height="85vh" p="10" rounded="40" maxWidth="1500px" margin="0 auto">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default MainStatsLayout;
