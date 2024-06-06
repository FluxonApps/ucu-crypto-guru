import { Box, Stack, Flex, Input, Text } from '@chakra-ui/react';
import { FC } from 'react';

const Template: FC<any> = ({ children }) => (
  <Box h="full" bg="linear-gradient(90deg, rgba(13,10,52,1) 0%, rgba(65,14,69,1) 100%)" overflow={'auto'}>
    <Flex minHeight="100vh" justify="flex-end" align="center" p={4}>
      <Box width="full" maxWidth="180vh" mx={2}>
        <Stack spacing={4} bg="white" rounded="md" borderRadius={30} overflow={'auto'}>
          <Flex width="full" justify="center">
            <Input placeholder="Search..." width="80%" height="50%" m={5} rounded="md" borderRadius={30} />
            <button className="bg-white p-4">🔍</button>
          </Flex>
          {children}
        </Stack>
      </Box>
    </Flex>
  </Box>
);

export default Template;
