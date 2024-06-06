import { HStack, Img, Link, Stack, Text } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import AuthPage from './pages/AuthPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import MainLayout from './components/layout/MainLayout.tsx';
import MainPage from './pages/MainPage.tsx';
import StatsPage from './pages/StatsPage.tsx';
import MainStatsLayout from './components/layout/MainStatsLayout.tsx';

import BlockPage from './pages/BlockPage.tsx';
import LessonBlock from './pages/LessonBlock.tsx';
import QuestionBlock from './pages/QuestionBlock.tsx';
import SwapPage from './pages/SwapPage.tsx';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/main" element={<MainStatsLayout />}>
        <Route path="blocks" element={<MainPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="swap" element={<SwapPage />} />
      </Route>
      <Route path="/block/:id" element={<BlockPage />}>
        <Route path="lesson/:lesson_id" element={<LessonBlock />} />
        <Route path="quest" element={<QuestionBlock />} />
      </Route>
    </Routes>
  );
};
