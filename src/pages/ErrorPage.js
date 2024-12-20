// src/pages/ErrorPage.js
import React from 'react';
import {
Box,
Container,
Heading,
Text,
Button,
VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
return (
  <Container maxW="container.md" py={20}>
    <VStack spacing={6} textAlign="center">
      <Heading size="2xl">404</Heading>
      <Heading size="xl">Page Not Found</Heading>
      <Text color="gray.600">
        The page you're looking for doesn't exist or has been moved.
      </Text>
      <Button as={Link} to="/" colorScheme="blue">
        Return Home
      </Button>
    </VStack>
  </Container>
);
};

export default ErrorPage;
