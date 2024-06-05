import React, { useState } from 'react';
import { Box, Button, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';

interface Question {
  id: number;
  text: string;
}

const questions: Question[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  text: `Question ${i + 1} text.`, // Placeholder text, you can replace with actual questions
}));

const QuestionBlock: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleAnswerChange = (id: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: answer,
    }));
  };

  const handleSubmit = () => {
    // Handle quiz submission, you can send the answers to the server or process them as needed
    console.log(answers);
  };

  return (
    <Box p={6} maxW="container.md" mx="auto">
      <Text fontFamily="Helvetica" fontSize={22} fontWeight="bold">
        Quiz - Title of the block
      </Text>
      {questions.map((question) => (
        <Box key={question.id} p={4} my={4} borderWidth="1px" borderRadius="lg" backgroundColor='#FCCFBF'>
          <Text fontWeight='bold'>{question.text}</Text>
          <RadioGroup
            onChange={(value) => handleAnswerChange(question.id, value)}
            value={answers[question.id] || ''}
          >
            <Stack direction="row">
              <Radio value="True">True</Radio>
              <Radio value="False">False</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      ))}
      <Button colorScheme="orange" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default QuestionBlock;

