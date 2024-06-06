import { Box, Divider, Progress, Text } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { collection, CollectionReference, doc, getDoc, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../../firebase.config';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';

const auth = getAuth();

const StatsPage = () => {
  const [user] = useAuthState(auth);
  const usersCollectionRef = collection(db, 'users');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        const userDocRef = doc(usersCollectionRef, user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setUserData(userDocSnapshot.data());
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserData();
  }, [user?.uid]);

  if (userData) {
    return (
      <Box color="black">
        <Text fontSize="3xl" mb="4" color="black" fontWeight="bold">
          Full Statistics
        </Text>
        {userData.testScores.map((element, index) => {
          return (
            <Box padding="20px" border="1px solid #E2E8F0" borderRadius="md" boxShadow="sm">
              <Text fontSize="lg" fontWeight="bold" color="orange.500">
                Test {index + 1}
              </Text>
              <Text fontSize="lg" marginTop="10px" fontWeight="500">
                Your score:
              </Text>
              <Progress value={element} size="lg" colorScheme="green" borderRadius="md" marginTop="10px" />
              <Text fontSize="lg" marginTop="10px" textAlign="right">
                {element}%
              </Text>
            </Box>
          );
        })}
        <Divider my="20px" border="2px solid grey" />
        <Text fontSize="20px" fontWeight="bold" display="flex" gap="10px" alignItems="center">
          Average Score:
          <Text color="orange.500" fontSize="30px" mt="-3px">
            {Math.round(userData.testScores.reduce((a, b) => a + b, 0) / userData.testScores.length)}
          </Text>
        </Text>
      </Box>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default StatsPage;
