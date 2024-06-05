import { Divider, Box, Button, Spinner, Text, Flex, Heading } from '@chakra-ui/react';
import { doc, getDoc, getFirestore, query, CollectionReference, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useParams, Outlet } from 'react-router-dom';
import Template from './layout/Template.tsx';
import { Link, IconButton } from '@chakra-ui/react';
import { BsShareFill } from "react-icons/bs";

const db = getFirestore();

const BlockPage = () => {
  const { id } = useParams<{ id: string }>();
  const [block, setBlock] = useState<any>(null);

  useEffect(() => {
    const fetchBlock = async () => {
      const docRef = doc(db, "blocks", id);
      const docSnap = await getDoc(docRef);
      setBlock(docSnap.data());
    };

    fetchBlock();
  }, [id]);

  const lessonsRef = collection(db, "blocks", id, "lessons");
  const [lessons] = useCollection(
    query(lessonsRef) as CollectionReference,
  );

  if (!block) {
    return (
      <Template>
        <Box p={6}>
          <Text fontFamily={'Helvetica'} fontSize={22} fontWeight='bold'>No block data found</Text>
        </Box>
      </Template>
    );
  } else {
    return (
      <Template>
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Box flex="1" p={3}>
            <Box px={10}>
              <Heading paddingBottom={5}>{block.name} - {block.description}</Heading>
            </Box>
            <Box>
              <Outlet />
            </Box>
          </Box>
          <Box flexShrink={0} flexBasis={{ base: '100%', md: '450px' }} marginLeft={{ base: 0, md: 30 }}>
            {lessons?.docs.map((lesson) => (
              <Link key={lesson.id} href={`/blocks/${id}/lessons/${lesson.id}`} textDecoration={'none'} _hover={{ bg: 'white', color: 'black' }}>
                <Box display={'flex'} flexDirection={'row'} marginTop={3} marginBottom={3}>
                  <IconButton
                    size="sm"
                    colorScheme='orange'
                    aria-label='stats'
                    icon={<BsShareFill />}
                    margin={1}
                    boxSize="50px"
                  />
                  <Box display={'flex'} flexDirection={'column'}>
                    <Heading paddingTop={2} paddingLeft={30} size='md'>{lesson.data().title}</Heading>
                    <Text paddingLeft={30} size='md' color={'grey'}>a bit of text</Text>
                  </Box>
                </Box>
                <Divider />
              </Link>
            ))}
          </Box>
        </Flex>
      </Template>
    );
  }
};

export default BlockPage;
