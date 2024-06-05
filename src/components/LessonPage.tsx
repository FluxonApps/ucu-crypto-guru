import React from 'react';
import { ChakraProvider, Box, Text, Image, Grid, GridItem, Input, Link, Button } from '@chakra-ui/react';
import bitcoinImage from '../assets/main/bitcoin.png';
import { SearchIcon } from '@chakra-ui/icons';

const MainPage: React.FC = () => {
  return (
    <ChakraProvider>
      <Box
        bg="linear-gradient(90deg, rgba(13,10,52,1) 0%, rgba(119,24,126,1) 100%)"
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
          maxWidth="1300px"
          margin="0 auto"
          mt="20px"
          mb="30px"
        >
          <Box fontSize="2xl" fontWeight="bold">
            <Box alignItems="center" justifyContent="center" display="flex">
              <Image src={bitcoinImage} display="inline-block" mr="2" boxSize="60px" />
              CryptoGuru
            </Box>
          </Box>
          <Box>
            <Text display="inline-block" mr="5" cursor="pointer" fontSize="20px">
              Blocks
            </Text>
            <Text display="inline-block" cursor="pointer" fontSize="20px">
              Stats
            </Text>
          </Box>
        </Box>

        <Box background="#ffffff" height="90vh" p="10" rounded="20" maxWidth="1500px" margin="0 auto">
          <Box display="flex" justifyContent="center">
            <SearchIcon />
            <Input placeholder="Search..." bg="#F6F6F5" color="black" mb="8" width="50vw" rounded="10" />
          </Box>

          <Text fontSize="3xl" mb="4" color="black" fontWeight="bold">
            Blocks
          </Text>


          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <Box
              bg="black"
              p="4"
              borderRadius="md"
              backgroundImage="url(https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
              backgroundSize="600px"
              backgroundRepeat="no-repeat"
              height="300px"
              rounded="40"
              display="flex"
              flexDir="column"
              justifyContent="space-between"
            >
              <Box display="flex" justifyContent="space-between" pr="2" pl="2">
                <Text mt="2" fontSize="30px" fontFamily="monospace">
                  Blockchain basis
                </Text>
                <Box
                  bg="orange.500"
                  borderRadius="full"
                  px="2"
                  py="1"
                  mt="4"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontWeight="bold"
                >
                  82 min
                </Box>
              </Box>
              <Box p="5" backdropFilter="blur(10px)">
                <Text fontSize="md" fontWeight="bold">
                  Learning the basics of blockchain in N lessons
                </Text>
              </Box>
              <Button as={Link} to={`1`} colorScheme="teal" mt="2">
                Go to Lesson
              </Button>
            </Box>
          </GridItem>
          <GridItem>
              <Box
                bg="black"
                p="4"
                borderRadius="md"
                backgroundImage="url(https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
                backgroundSize="600px"
                backgroundRepeat="no-repeat"
                height="300px"
                rounded="40"
                display="flex"
                flexDir="column"
                justifyContent="space-between"
              >
                <Box display="flex" justifyContent="space-between" pr="2" pl="2">
                  <Text mt="2" fontSize="30px" fontFamily="monospace">
                    Blockchain basis
                  </Text>
                  <Box
                    bg="orange.500"
                    borderRadius="full"
                    px="2"
                    py="1"
                    mt="4"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontWeight="bold"
                  >
                    82 min
                  </Box>
                </Box>
                <Box p="5" backdropFilter="blur(10px)">
                  <Text fontSize="md" fontWeight="bold">
                    Learning the basics of blockchain in N lessons
                  </Text>
                </Box>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                bg="black"
                p="4"
                borderRadius="md"
                backgroundImage="url(https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
                backgroundSize="600px"
                backgroundRepeat="no-repeat"
                height="300px"
                rounded="40"
                display="flex"
                flexDir="column"
                justifyContent="space-between"
              >
                <Box display="flex" justifyContent="space-between" pr="2" pl="2">
                  <Text mt="2" fontSize="30px" fontFamily="monospace">
                    Blockchain basis
                  </Text>
                  <Box
                    bg="orange.500"
                    borderRadius="full"
                    px="2"
                    py="1"

                    mt="4"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontWeight="bold"
                  >
                    82 min
                  </Box>
                </Box>
                <Box p="5" backdropFilter="blur(10px)">
                  <Text fontSize="md" fontWeight="bold">
                    Learning the basics of blockchain in N lessons
                  </Text>
                </Box>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                bg="black"
                p="4"
                borderRadius="md"
                backgroundImage="url(https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
                backgroundSize="600px"
                backgroundRepeat="no-repeat"
                height="300px"
                rounded="40"
                display="flex"
                flexDir="column"
                justifyContent="space-between"
              >
                <Box display="flex" justifyContent="space-between" pr="2" pl="2">
                  <Text mt="2" fontSize="30px" fontFamily="monospace">
                    Blockchain basis
                  </Text>
                  <Box
                    bg="orange.500"
                    borderRadius="full"
                    px="2"
                    py="1"
                    mt="4"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontWeight="bold"
                  >
                    82 min
                  </Box>
                </Box>
                <Box p="5" backdropFilter="blur(10px)">
                  <Text fontSize="md" fontWeight="bold">
                    Learning the basics of blockchain in N lessons
                  </Text>
                </Box>
              </Box>
            </GridItem>

            {/* Repeat GridItem for other blocks */}
          </Grid>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default MainPage;