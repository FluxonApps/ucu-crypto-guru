
import { Box, Text, SimpleGrid, Container, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { collection, CollectionReference, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';

const MainPage: React.FC = () => {
  interface Block {
    id: string;
    name: string;
    description: string;
    minutes: number;
    imgUrl: string;
    lessons: object;
    tests: object;
    order: number;
  }
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlocks, setFilteredBlocks] = useState<Block[]>([]);

  const blocksCollectionRef = collection(db, 'blocks');
  const [blocks, blocksLoading, blocksError] = useCollection(
    query(blocksCollectionRef, orderBy('order')) as CollectionReference<Block>,
  );

  useEffect(() => {
    if (blocks?.docs) {
      const blocksData = blocks.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Block));
      setFilteredBlocks(blocksData);
    }
  }, [blocks]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    if (blocks?.docs) {
      const blocksData = blocks.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Block));
      const filtered = blocksData.filter((block) =>
        block.name.toLowerCase().includes(searchTerm) || block.description.toLowerCase().includes(searchTerm)
      );
      setFilteredBlocks(filtered);
    }
  }, [searchTerm, blocks]);

  return (
    <Box>
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
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
      </Box>

      <Text fontSize="3xl" mb="4" color="black" fontWeight="bold">
        Blocks
      </Text>

      <Box overflow="auto" height="70vh">
        <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gap={6} spacing={10}>
          {filteredBlocks.map((block) => (
            <Link to={`/block/${block.id}`} key={block.order}>
              <Box
                bg="black"
                p="4"
                borderRadius="md"
                backgroundImage={`url(${block.imgUrl})`}
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                height="300px"
                rounded="40"
                display="flex"
                flexDir="column"
                justifyContent="space-between"
                cursor="pointer"
              >
                <Box display="flex" justifyContent="space-between" pr="2" pl="2">
                  <Text mt="2" fontSize="30px" fontFamily="monospace">
                    {block.name}
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
                    {block.minutes} min
                  </Box>
                </Box>
                <Box p="5" backdropFilter="blur(10px)">
                  <Text fontSize="md" fontWeight="bold">
                    {block.description}
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default MainPage;
