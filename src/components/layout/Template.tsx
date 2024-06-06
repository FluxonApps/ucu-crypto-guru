import { Box, Stack, Flex, Input, Text} from '@chakra-ui/react';
import { FC } from 'react';

const Template: FC<any> = ({ children }) => (
  <Box h="full" bg="radial-gradient(at left top, #050311 20%, #2A53C7 100%)" overflow={'auto'}>
    <Flex
      minHeight="100vh"
      justify="flex-end"
      align="center"
      p={4}
    >
      <Box width="full" maxWidth="180vh" mx={2}>
        <Stack spacing={4} bg="white" rounded="md" borderRadius={30} overflow={'auto'}>
          <Flex width='full' justify='center'>
            <Input placeholder="Search..." width ='80%' height='50%' m={5} rounded="md" borderRadius={30}/>
            <button className="bg-white p-4">🔍</button>
          </Flex>
          {children}
        </Stack>
      </Box>
    </Flex>
  </Box>
);

export default Template;