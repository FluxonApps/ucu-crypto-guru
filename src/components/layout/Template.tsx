import { SearchIcon } from '@chakra-ui/icons';
import {getAuth, signOut } from "firebase/auth";
import { Box, Image, Input, InputGroup, InputLeftElement, Text, IconButton, Button } from '@chakra-ui/react';
import { BsPersonFill } from "react-icons/bs";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logoImage from '../../assets/main/token.png';
import blocksImage from '../../assets/main/blocks.png';
import statsImage from '../../assets/main/stats.png';
import { FC } from 'react';
import { BsPerson } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";



const Template: FC<any> = ({ children }) => {
  const navigation = useNavigate()
  const auth = getAuth();
  console.log(auth);
    const logout = () => { signOut(auth).then(() => {
      navigation('/');
    }).catch((error) => {});
  }

  return  (<Box bg="linear-gradient(90deg, rgba(13,10,52,1) 0%, rgba(65,14,69,1) 100%)" minH="100vh" >
    <Box padding="4" maxWidth="1450px" margin="0 auto">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mx="10"
        my="20px"
        color="white"
        overflow={'auto'}
        
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
          
          <Button display="flex"
              cursor="pointer"
              padding="20px"
              ml="2"
              variant='ghost'
              color={'white'}
              _hover={{ bg: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', transition: '0.5s ease', height: '60px'  }}onClick={logout}>
              <CiLogout size="30px"/>
          </Button>

        </Box>
      </Box>

      <Box bgColor="white" p="10" rounded="40" minH="80vh" overflowY="auto" height={'55vh'}
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '-ms-overflow-style': 'none',  // for Internet Explorer and Edge
              'scrollbar-width': 'none',     // for Firefox
            }}>
        <Box mt={10}>
          {children}
        </Box>
      </Box>
    </Box>
  </Box>)
};

export default Template;
