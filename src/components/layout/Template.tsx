import { Box, Stack, Flex, Input, Text, IconButton} from '@chakra-ui/react';
import { FC } from 'react';
import { BsSearch } from "react-icons/bs";



const Template: FC<any> = ({ children }) => (
  <Box overflow={'auto'} h="full" bg="radial-gradient(at left top, #050311 20%, #2A53C7 100%)">
    <Flex
      // height="100vh"
      justify="flex-end"
      align="center"
      p={4}
    >
      <Box flex="none" mx={2}>
        <Stack spacing={4} bg="white" rounded="md" borderRadius={30} width = '180vh'>
          <Flex width = '50%'>
            <Input placeholder="Search..." width ='80%' height='70%' m={5} rounded="md" borderRadius={30}/>
            {/* <button className="bg-white p-4">🔍</button> */}
            <IconButton margin={4} aria-label='Search database' icon={<BsSearch />} />
          </Flex>
          {children}
        </Stack>  
      </Box>
    </Flex>
  </Box>
);

export default Template;