import { HStack, Img, Link, Stack, Text } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import fluxonLogo from './assets/fluxon-logo.svg';
import AuthPage from './pages/AuthPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import FirebaseDemo from './pages/FirebaseDemo.tsx';
import MainLayout from './components/layout/MainLayout.tsx';
import MainPage from './pages/MainPage.tsx';
import StatsPage from './pages/StatsPage.tsx';
import MainStatsLayout from './components/layout/MainStatsLayout.tsx';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/firebase-demo" element={<FirebaseDemo />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/main" element={<MainStatsLayout />}>
        <Route path="blocks" element={<MainPage />} />
        <Route path="stats" element={<StatsPage />} />
      </Route>
    </Routes>
  );
};

const EventPage = () => {
  return (
    <MainLayout>
      <Stack spacing={4} justifyContent="center" alignItems="center" h="full">
        <Link target="_blank" href="https://fluxon.com">
          {/* <Img w={300} src={fluxonLogo} /> */}
        </Link>
        <Text color="white">UCU x Fluxon Product Development Bootcamp</Text>
        <HStack mt={4} color="blue.100">
          <Link href="/firebase-demo">Firebase demo</Link>
          <Text>|</Text>
          <Link href="/auth">Authenticate</Link>
        </HStack>
      </Stack>
    </MainLayout>
  );
};
