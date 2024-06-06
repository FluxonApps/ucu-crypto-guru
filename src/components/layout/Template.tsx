import { SearchIcon } from '@chakra-ui/icons';
import { Box, Image, Input, InputGroup, InputLeftElement, SimpleGrid, Text } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';
import logoImage from '../../assets/main/token.png';
import blocksImage from '../../assets/main/blocks.png';
import statsImage from '../../assets/main/stats.png';
import { FC } from 'react';

const Template: FC<any> = ({ children }) => (
  <Box overflow="auto" bg="linear-gradient(90deg, rgba(13,10,52,1) 0%, rgba(65,14,69,1) 100%)" minH="100vh" padding="4">
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

      <Box height="80vh" bgColor={'white'} p="10" rounded="40" maxWidth="1500px" margin="0 auto">
        <Box display="flex" justifyContent="center">
          <InputGroup width="100" display="flex" alignItems="center">
            <InputLeftElement pointerEvents="none" height="50px">
              <SearchIcon height="50px" w="20px" color="gray.500" />
            </InputLeftElement>

            <Input
              placeholder="Search..."
              bg="#F6F6F5"
              color="black"
              mb="8"
              width="50vw"
              rounded="10"
              h="50px"
              fontSize="20px"
            />
          </InputGroup>
        </Box>
        <Box >
          {children}
        </Box>
          
        
        
      </Box>
    </Box>
);

export default Template;