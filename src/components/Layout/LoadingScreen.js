// src/components/Layout/LoadingScreen.js
import React from 'react';
import {
  Box,
  VStack,
  Spinner,
  Text,
} from '@chakra-ui/react';

const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text>{message}</Text>
      </VStack>
    </Box>
  );
};

export default LoadingScreen;