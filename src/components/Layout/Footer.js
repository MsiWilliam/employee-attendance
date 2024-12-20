// src/components/Layout/Footer.js
import React from 'react';
import { Box, Container, Text, Stack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="gray.50" color="gray.700" mt="auto">
      <Container maxW="container.xl" py={4}>
        <Stack direction="row" spacing={4} justify="center" align="center">
          <Text fontSize="sm">© 2024 Employee Attendance System</Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;