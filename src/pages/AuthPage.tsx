import { Box, Button, Flex, Image, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useState } from 'react';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import logoImage from '../assets/main/token.png';

import { db } from '../../firebase.config.ts';

import MainLayout from '../components/layout/MainLayout.tsx';

const auth = getAuth();

const AuthPage = () => {
  const toast = useToast();

  const [user] = useAuthState(auth);
  const [signInWithEmailAndPassword, , signInLoading] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, , signUpLoading] = useCreateUserWithEmailAndPassword(auth);
  const loading = signInLoading || signUpLoading;

  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const switchAuthMode = () => {
    setShowSignIn((prevState) => !prevState);
    setEmail('');
    setPassword('');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (!res) throw new Error();

      toast({ status: 'success', description: 'Successfully signed in!' });
    } catch (e) {
      console.error(e);
      toast({
        status: 'error',
        title: 'Error',
        description: 'Failed to sign in. Please, try again.',
      });
    }
  };

  const signUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      if (!res) throw new Error();

      // Save user to database.
      const userDocRef = doc(db, 'users', res.user.uid);
      await setDoc(userDocRef, { email, testScores: [] });

      toast({ status: 'success', description: 'Successfully signed up!' });
    } catch (e) {
      console.error(e);
      toast({
        status: 'error',
        title: 'Error',
        description: 'Failed to create a new user. Please, try again.',
      });
    }
  };

  const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showSignIn) {
      await signIn();
    } else {
      await signUp();
    }
  };

  // Check if user is already signed in. If yes, redirect to main app.
  if (user) {
    return <Navigate to="/main/blocks" replace />;
  }

  return (
    <MainLayout>
      <Flex w="full" h="full" alignItems="center" flexDir="column" justifyContent="center" gap="50px">
        <Box fontSize="2xl" fontWeight="bold">
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            color="white"
            flexDir="column"
            mt="-150px"
            fontSize="40px "
          >
            <Image src={logoImage} display="inline-block" boxSize="100px" />
            CryptoGuru
          </Box>
        </Box>
        <Box mx="auto" as="form" onSubmit={handleAuth}>
          <Stack spacing={4} w={500} bg="white" rounded="md" p={8}>
            <Text fontSize="2xl">{showSignIn ? 'Sign in' : 'Sign up'}</Text>
            <Input placeholder="Email" type="email" onChange={handleEmailChange} value={email} required />
            <Input
              placeholder="Password"
              type="password"
              onChange={handlePasswordChange}
              value={password}
              minLength={6}
              required
            />
            <Button type="submit" colorScheme="blue" isDisabled={loading} isLoading={loading}>
              Submit
            </Button>
            <Button
              mt={4}
              fontSize="sm"
              fontWeight="normal"
              variant="link"
              onClick={switchAuthMode}
              isDisabled={loading}
            >
              {showSignIn ? 'Create a new account?' : 'Already have an account?'}
            </Button>
          </Stack>
        </Box>
      </Flex>
    </MainLayout>
  );
};

export default AuthPage;
