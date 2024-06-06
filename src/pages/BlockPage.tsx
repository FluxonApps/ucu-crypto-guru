import { Divider, Box, Button, Spinner, Text, Flex, Heading } from '@chakra-ui/react';
import { doc, getDoc, getFirestore, query, CollectionReference, collection, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import Template from '../components/layout/Template.tsx';
import { Link, IconButton } from '@chakra-ui/react';
import { BsShareFill } from "react-icons/bs";

const db = getFirestore();

const BlockPage = () => {
  const { id, lesson_id } = useParams<{ id: string, lesson_id?: string }>();
  const [block, setBlock] = useState<any>(null);
  const [isLastLesson, setIsLastLesson] = useState(false);
  const navigate = useNavigate();

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
    query(lessonsRef, orderBy('order')) as CollectionReference,
  );

  useEffect(() => {
    if (lessons && lessons.docs.length > 0 && lesson_id) {
      const lastLessonId = lessons.docs[lessons.docs.length - 1].id;
      setIsLastLesson(lesson_id === lastLessonId);
    }
  }, [lessons, lesson_id]);

  const handleGrayButtonClick = () => {
    window.alert('Please, finish all lessons before proceeding to the test!');
  };

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
        <Flex direction={{ base: 'column', md: 'row' }} height="100vh" overflow="auto">
          <Box flex="1" p={3}>
            <Box px={20}>
              <Heading paddingBottom={5}>{block.name} - {block.description}</Heading>
            </Box>
              <Outlet />
          </Box>
          <Box marginLeft={{ base: 0, md: 30 }} width={400} display={'flex'} flexDirection={'column'}>
            <Heading>Lessons</Heading>
            <Box flexShrink={0} flexBasis={{ base: '100%', md: '450px' }} 
                overflow="auto" p={6} 
                maxW="container.md" mx="auto" 
                height="50svh"

                css={{
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#e0e0e0',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',
                    borderRadius: '10px',
                    border: '2px solid #e0e0e0',
                  },
                  'scrollbar-width': 'thin',
                  'scrollbar-color': '#EEA58B #F3F3F3',
                }}
                // backgroundColor='Yellow'
                >
              {lessons?.docs.map((lesson) => (
                <Link key={lesson.id} href={`/block/${id}/lesson/${lesson.id}`} textDecoration={'none'} _hover={{ bg: 'white', color: 'black' }}>
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
            {isLastLesson && (
                <Link href={`/block/${id}/quest`}>
                  <Button colorScheme="orange" mt={4}>
                    Finalize
                  </Button>
                </Link>
              )}
            {(!isLastLesson) && (
                <Link>
                  <Button colorScheme="gray" onClick={handleGrayButtonClick} mt={4}>
                    Finalize
                  </Button>
                </Link>
              )}
          </Box>
        </Flex>
      </Template>
    );
  }
};

export default BlockPage;
