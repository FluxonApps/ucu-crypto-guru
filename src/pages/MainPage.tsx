import { Box, Text, SimpleGrid, Container } from '@chakra-ui/react';
import { collection, CollectionReference, query } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const MainPage: React.FC = () => {
  interface Block {
    id: string;
    name: string;
    description: string;
    minutes: number;
    imgUrl: string;
    lessons: object;
    tests: object;
  }

  // async function getImageURL(gsUrl: string) {
  //   try {
  //     const url = await getDownloadURL(gsUrl);
  //     return url;
  //   } catch (error) {
  //     console.error('Error fetching image URL:', error);
  //   }
  // }

  const blocksCollectionRef = collection(db, 'blocks');
  const [blocks, blcoksLoading, blocksError] = useCollection(query(blocksCollectionRef) as CollectionReference<Block>);
  const blocksInfo: Array<object> = [];
  const storage = getStorage();
  const gsReference = ref(
    storage,
    'gs://crypto-guru-ed9c7.appspot.com/block cover/photo-1519162584292-56dfc9eb5db4.avif',
  );

  if (blocks) {
    blocks?.docs.forEach((element) => {
      blocksInfo.push(element.data());
    });

    blocksInfo.sort((a, b) => a.order - b.order);
  }

  return (
    <Box>
      <Text fontSize="3xl" mb="4" color="black" fontWeight="bold">
        Blocks
      </Text>

      <Box overflow="auto" height="70vh">
        <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gap={6} spacing={10}>
          {blocksInfo &&
            blocksInfo.map((block) => {
              const gsReference = ref(storage, block.imgUrl);

              return ( 
                <Link to={`/block/${block.order}`} key={block.order}>
                  <Box
                    bg="black"
                    p="4"
                    borderRadius="md"
                    backgroundImage={`url(https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`}
                    backgroundSize="600px"
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
                        Learning the basics of blockchain in N lessons
                      </Text>
                    </Box>
                  </Box>
                </Link>
              );
            })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default MainPage;
