import React, { useState, useEffect } from 'react';
import { Box, Spinner, Text, Flex, Heading, AspectRatio, IconButton, Button } from '@chakra-ui/react';
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill, BsShareFill } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import { doc, getDoc, getFirestore, collection, query, orderBy } from 'firebase/firestore';

const db = getFirestore();

const LessonBlock = () => {
  const { id, lesson_id } = useParams<{ id: string, lesson_id: string }>();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLastLesson, setIsLastLesson] = useState<boolean>(false);

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      setError(null);
      try {
        const lessonRef = doc(db, "blocks", id, "lessons", lesson_id);
        const docSnap = await getDoc(lessonRef);
        if (docSnap.exists()) {
          setLesson(docSnap.data());
        } else {
          setError("Lesson not found");
        }
      } catch (err) {
        console.error("Error fetching lesson:", err);
        setError("Failed to fetch lesson data");
      }
      setLoading(false);
    };

    fetchLesson();
  }, [id, lesson_id]);

  useEffect(() => {
    const checkLastLesson = async () => {
      const lessonsRef = collection(db, "blocks", id, "lessons");
      const lessonsSnapshot = await query(lessonsRef, orderBy('order'));
      const lessonsData = lessonsSnapshot.docs.map(doc => doc.id);
      setIsLastLesson(lesson_id === lessonsData[lessonsData.length - 1]);
    };

    if (!loading && !error) {
      checkLastLesson();
    }
  }, [id, lesson_id, loading, error]);

  if (loading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  if (!lesson) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Text>No lesson data found</Text>
      </Flex>
    );
  }

  return (
    <>
      <Flex direction="column" align="center" p={6}>
        <Box width="80%" maxW="600px">
          <AspectRatio ratio={16 / 9} mb={4}>
            <iframe
              title='Lesson Video'
              src={lesson.videoURL}
              allowFullScreen
            />
          </AspectRatio>
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <IconButton
              size="sm"
              colorScheme='orange'
              aria-label='Like'
              icon={<BsFillHandThumbsUpFill />}
              mr={2}
              _hover={{ bg: 'white', color: 'black' }}
              transition="background-color 0.1s ease, color 0.1s ease"
            />
            <IconButton
              size="sm"
              colorScheme='orange'
              aria-label='Dislike'
              icon={<BsFillHandThumbsDownFill />}
              mr={2}
              _hover={{ bg: 'white', color: 'black' }}
              transition="background-color 0.1s ease, color 0.1s ease"
            />
            <IconButton
              size="sm"
              colorScheme='orange'
              aria-label='Share'
              icon={<BsShareFill />}
              _hover={{ bg: 'white', color: 'black' }}
              transition="background-color 0.1s ease, color 0.1s ease"
            />
          </Box>
          <Heading as="h2" size="lg" mb={2}>
            {lesson.title}
          </Heading>
          <Text fontSize="md" mb={4}>
            {lesson.description}
          </Text>
          <br></br>
          <div dangerouslySetInnerHTML={{__html: lesson.text}} />
        </Box>
      </Flex>
    </>
  );
};

export default LessonBlock;
