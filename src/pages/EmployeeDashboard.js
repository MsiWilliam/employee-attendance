// src/pages/EmployeeDashboard.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  SimpleGrid,
  useToast,
  Text,
} from '@chakra-ui/react';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';
import AttendanceButton from '../components/Dashboard/AttendanceButton';
import AttendanceHistory from '../components/Dashboard/AttendanceHistory';
import DashboardStats from '../components/Dashboard/DashboardStats';
import { calculateAttendanceStats } from '../utils/stats';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [companyLocation, setCompanyLocation] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch company location
      const { data: companyData } = await supabase
        .from('companies')
        .select('latitude, longitude')
        .single();

      if (companyData) {
        setCompanyLocation(companyData);
      }

      // Fetch attendance records
      if (user) {
        const { data: attendanceData } = await supabase
          .from('attendances')
          .select('*')
          .eq('user_id', user.id)
          .order('check_in_time', { ascending: false });

        if (attendanceData) {
          setAttendanceRecords(attendanceData);
          const calculatedStats = calculateAttendanceStats(attendanceData);
          setStats(calculatedStats);
        }
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

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box bg="white" p={6} rounded="lg" shadow="base">
            <Heading size="md" mb={6}>Check In</Heading>
            {companyLocation && (
              <AttendanceButton
                companyLocation={companyLocation}
                userId={user.id}
                onSuccess={fetchData}
              />
            )}
          </Box>
          {stats && (
            <Box bg="white" p={6} rounded="lg" shadow="base">
              <Heading size="md" mb={6}>Statistics</Heading>
              <DashboardStats stats={stats} />
            </Box>
          )}
        </SimpleGrid>

        <Box bg="white" p={6} rounded="lg" shadow="base">
        <Heading size="md" mb={6}>Attendance History</Heading>
        <AttendanceHistory 
          attendanceRecords={attendanceRecords} 
        />
      </Box>

      <Box bg="white" p={6} rounded="lg" shadow="base">
        <Heading size="md" mb={6}>Monthly Overview</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box>
            <VStack align="stretch" spacing={4}>
              <Box>
                <Heading size="sm" mb={2}>Work Schedule</Heading>
                <Text>Monday - Friday</Text>
                <Text>Check-in Time: 9:00 AM</Text>
              </Box>
              <Box>
                <Heading size="sm" mb={2}>Location Requirements</Heading>
                <Text>Must be within 100 meters of office location</Text>
                <Text>GPS accuracy may vary</Text>
              </Box>
            </VStack>
          </Box>
          <Box>
            <VStack align="stretch" spacing={4}>
              <Box>
                <Heading size="sm" mb={2}>This Month's Summary</Heading>
                {stats && (
                  <>
                    <Text>Total Working Days: {stats.workingDays}</Text>
                    <Text>Days Present: {stats.daysPresent}</Text>
                    <Text>Attendance Rate: {stats.attendanceRate}%</Text>
                  </>
                )}
              </Box>
              <Box>
                <Heading size="sm" mb={2}>Notes</Heading>
                <Text color="gray.600">
                  Remember to enable location services for accurate check-in.
                </Text>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>
    </VStack>
  </Container>
);
};

export default EmployeeDashboard;

