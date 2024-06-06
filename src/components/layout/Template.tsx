import { SearchIcon } from '@chakra-ui/icons';
import { Box, Image, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';
import logoImage from '../../assets/main/token.png';
import blocksImage from '../../assets/main/blocks.png';
import statsImage from '../../assets/main/stats.png';
import { FC } from 'react';

const Template: FC<any> = ({ children }) => (
  <Box bg="linear-gradient(90deg, rgba(13,10,52,1) 0%, rgba(65,14,69,1) 100%)" minH="vh" overflow="auto">
    <Box padding="4" maxWidth="1450px" margin="0 auto">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mx="10"
        my="20px"
        color="white"
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
        </Box>
      </Box>

      <Box bgColor="white" p="10" rounded="40" minH="80vh" overflowY="auto">
        <Box display="flex" justifyContent="center" mb="8">
          <InputGroup width="50vw">
            <InputLeftElement pointerEvents="none" height="50px">
              <SearchIcon height="50px" w="20px" color="gray.500" />
            </InputLeftElement>
            <Input
              placeholder="Search..."
              bg="#F6F6F5"
              color="black"
              rounded="10"
              h="50px"
              fontSize="20px"
            />
          </InputGroup>
        </Box>
        <Box>
          {children}
        </Box>
      </Box>
    </Box>
  </Box>
);

export default Template;
