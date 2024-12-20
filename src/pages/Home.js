  // src/pages/Home.js
  import React from 'react';
  import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Image,
  } from '@chakra-ui/react';
  import Login from '../components/Auth/Login';
  import Register from '../components/Auth/Register';
  import { useAuth } from '../context/AuthContext';
  import { Navigate } from 'react-router-dom';
  
  const Home = () => {
    const { user } = useAuth();
  
    if (user) {
      return <Navigate to="/dashboard" />;
    }
  
    return (
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8}>
          <Box textAlign="center">
            <Heading size="xl" mb={4}>Welcome to Employee Attendance System</Heading>
            <Text color="gray.600">
              Manage your attendance efficiently and securely
            </Text>
          </Box>
  
          <Box w="full" maxW="md" bg="white" rounded="lg" shadow="base" p={6}>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>Login</Tab>
                <Tab>Register</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <Register />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </VStack>
      </Container>
    );
  };
  
  export default Home;
  