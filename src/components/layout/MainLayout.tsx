import { Box } from '@chakra-ui/react';
import { FC } from 'react';

const MainLayout: FC<any> = ({ children }) => (
  <Box h="full" bg="radial-gradient(at left top, #0d0a34 20%, #410e45 100%)">
    {children}
  </Box>
);

export default MainLayout;
