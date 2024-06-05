import { Avatar, Box, Divider, Image, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import React from 'react';
import logoImage from '../assets/main/token.png';
import blocksImage from '../assets/main/blocks.png';
import statsImage from '../assets/main/stats.png';
import computerImage from '../assets/main/computer.png';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const LessonPage = () => {
  const lessons = [
    {
      title: 'Blockchain',
      imgLink:
        'https://images.unsplash.com/photo-1603558412720-cd837d10b06d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: 10,
      caption: 'lesson 1',
    },
    {
      title: 'Bitcoin',
      imgLink:
        'https://images.unsplash.com/photo-1603558412720-cd837d10b06d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: 20,
      caption: 'lesson 2',
    },
  ];

  return (
    <Box display="flex" h="100vh" bg="purple.500">
      <Box w="200px" display="flex" flexDir="column" alignItems="center">
        <Avatar src={logoImage} mt="50px" boxSize="70px" />
        <Link to="/main/blocks">
          <Box
            p="10"
            _hover={{ bg: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', transition: '0.5s ease' }}
            mt="150px"
          >
            <Image src={blocksImage} boxSize="35px" />
          </Box>
        </Link>
        <Link to="/main/stats">
          <Box p="10" _hover={{ bg: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', transition: '0.5s ease' }}>
            <Image src={statsImage} boxSize="35px" />
          </Box>
        </Link>
      </Box>
      <Box display="flex" flexDir="column" bg="white" m="7" rounded="50" p="10">
        <Box display="flex" justifyContent="center" mb="40px">
          <InputGroup width="100%" display="flex" alignItems="center">
            <InputLeftElement pointerEvents="none" height="50px">
              <SearchIcon height="50px" w="20px" color="gray.500" />
            </InputLeftElement>

            <Input
              placeholder="Search..."
              bg="#F6F6F5"
              color="black"
              mb="8"
              width="5100%"
              rounded="10"
              h="50px"
              fontSize="20px"
            />
          </InputGroup>
        </Box>

        <Box display="flex" gap="40px">
          <Box>
            <Box>
              <Text fontSize="30" fontWeight="bold" mb="30px">
                Block - Title of the block
              </Text>
              <Image src={computerImage} mb="50px"></Image>
              <Text fontSize="25" fontWeight="600" mb="5px">
                Lesson 6 - Title of the lesson
              </Text>
              <Text width="40vw">
                In this lesson, you use navigation controllers and segues to create the navigation flow of the
                FoodTracker app. At the end of the lesson, you’ll have a complete navigation scheme and interaction flow
                for the app.
              </Text>
            </Box>
          </Box>

          <Box height="100%" width="500px">
            <Text fontSize="30px" fontWeight="bold" mb="20px">
              Lessons
            </Text>
            <Box display="flex" flexDir="column" gap="30px">
              {lessons.map((element) => {
                return (
                  <Box display="flex" alignItems="center">
                    <Box mr="10px">
                      <Avatar src={element.imgLink} />
                    </Box>
                    <Box>
                      <Text fontWeight="700" fontSize="20px">
                        {element.title}
                      </Text>
                      <Box display="flex" gap="30px">
                        <Text color="grey">{element.caption}</Text>
                        <Text color="grey">{element.duration} min</Text>
                      </Box>
                      <Divider />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LessonPage;
