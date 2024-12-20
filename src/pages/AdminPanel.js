  // src/pages/AdminPanel.js
  import { checkUserRole } from '../utils/auth';
  import React, { useState, useEffect } from 'react';
  import {
    Box,
    Container,
    Heading,
    VStack,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useToast,
    Alert,
    AlertIcon,
  } from '@chakra-ui/react';
  import { supabase } from '../config/supabase';
  import { useAuth } from '../context/AuthContext';
  import { Navigate } from 'react-router-dom';
  
  const AdminPanel = () => {
    const { user } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [companyData, setCompanyData] = useState({
      name: '',
      address: '',
      latitude: '',
      longitude: '',
    });
    const [employees, setEmployees] = useState([]);
    const toast = useToast();
  
    useEffect(() => {
      checkAdminStatus();
      fetchData();
    }, []);
  
    const checkAdminStatus = async () => {
      if (user) {
        const role = await checkUserRole(user.id);
        setIsAdmin(role === 'admin');
      }
      setLoading(false);
    };
  
    const fetchData = async () => {
      try {
        // Fetch company data
        const { data: companyData } = await supabase
          .from('companies')
          .select('*')
          .single();
  
        if (companyData) {
          setCompanyData(companyData);
        }
  
        // Fetch employees
        const { data: employeesData } = await supabase
          .from('employees')
          .select('*')
          .order('name');
  
        if (employeesData) {
          setEmployees(employeesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch data',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
  
    const handleCompanySubmit = async (e) => {
      e.preventDefault();
      try {
        const { error } = await supabase
          .from('companies')
          .upsert([companyData]);
  
        if (error) throw error;
  
        toast({
          title: 'Success',
          description: 'Company settings updated successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
  
    if (loading) {
      return <Box>Loading...</Box>;
    }
  
    if (!isAdmin) {
      return <Navigate to="/dashboard" />;
    }
  
    return (
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="stretch">
          <Box bg="white" p={6} rounded="lg" shadow="base">
            <Heading size="md" mb={6}>Company Settings</Heading>
            <form onSubmit={handleCompanySubmit}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <FormControl isRequired>
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    value={companyData.name}
                    onChange={(e) => setCompanyData({
                      ...companyData,
                      name: e.target.value
                    })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Address</FormLabel>
                  <Input
                    value={companyData.address}
                    onChange={(e) => setCompanyData({
                      ...companyData,
                      address: e.target.value
                    })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Latitude</FormLabel>
                  <Input
                    type="number"
                    step="any"
                    value={companyData.latitude}
                    onChange={(e) => setCompanyData({
                      ...companyData,
                      latitude: e.target.value
                    })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Longitude</FormLabel>
                  <Input
                    type="number"
                    step="any"
                    value={companyData.longitude}
                    onChange={(e) => setCompanyData({
                      ...companyData,
                      longitude: e.target.value
                    })}
                  />
                </FormControl>
              </SimpleGrid>
              <Button
                mt={6}
                colorScheme="blue"
                type="submit"
              >
                Save Settings
              </Button>
            </form>
          </Box>
  
          <Box bg="white" p={6} rounded="lg" shadow="base">
            <Heading size="md" mb={6}>Employee Management</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Department</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employees.map((employee) => (
                  <Tr key={employee.id}>
                    <Td>{employee.name}</Td>
                    <Td>{employee.email}</Td>
                    <Td>{employee.department}</Td>
                    <Td>{employee.role}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Container>
    );
  };
  
  export default AdminPanel;
  
  