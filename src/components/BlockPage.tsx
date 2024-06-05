import { Box, Spinner, Text, Flex } from '@chakra-ui/react';
import { doc, getDoc, collection, query, CollectionReference, getFirestore } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useParams, Outlet } from 'react-router-dom';
import Template from './layout/Template';

const auth = getAuth();
const db = getFirestore();

const BlockPage = () => {
  const { id } = useParams<{ id: string }>();
  const [block, setBlock] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlock = async () => {
      try {
        const docRef = doc(db, "blocks", id);
        const docSnap = await getDoc(docRef);
        setBlock(docSnap.data());
      } catch (error) {
        console.error("Error fetching block:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlock();
  }, [id]);

  const lessonsRef = collection(db, "blocks", id, "lessons");
  const [lessons, lessonsLoading, lessonsError] = useCollection(
    query(lessonsRef) as CollectionReference,
  );

  if (loading || lessonsLoading) {
    return <Spinner />;
  }

  if (!block) {
    return (
      <Template>
        <Box p={6}>
          <Text fontFamily={'Helvetica'} fontSize={22} fontWeight='bold'>No block data found</Text>
          <Outlet />
        </Box>
      </Template>
    );
  }

  return (
    <Template>
      <Flex>
        <Box p={6}>
          <Text fontFamily={'Helvetica'} fontSize={22} fontWeight='bold'>{block.name} - {block.description}</Text>
          <Outlet />
        </Box>
        <Flex flexDirection="column" marginLeft={80}>
          {lessons?.docs.map((lesson) => (
            <Text key={lesson.id}>Name: {lesson.data().title}</Text>
          ))}
        </Flex>
      </Flex>
    </Template>
  );
};

export default BlockPage;
