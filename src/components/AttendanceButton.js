// src/components/Dashboard/AttendanceButton.js
import React, { useState } from 'react';
import {
  Button,
  VStack,
  useToast,
  Text,
} from '@chakra-ui/react';
import { supabase } from '../../config/supabase';
import LocationCheck from './LocationCheck';

const AttendanceButton = ({ companyLocation, userId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleAttendance = async () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Error',
        description: 'Geolocation is not supported by your browser',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      // Get current position
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const currentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      // Record attendance
      const { data, error } = await supabase
        .from('attendances')
        .insert([
          {
            user_id: userId,
            check_in_time: new Date().toISOString(),
            location: currentLocation,
          }
        ]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Attendance recorded successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <LocationCheck companyLocation={companyLocation} />
      <Button
        colorScheme="blue"
        isLoading={loading}
        onClick={handleAttendance}
        size="lg"
      >
        Check In
      </Button>
      <Text fontSize="sm" color="gray.500">
        Make sure you allow location access to check in
      </Text>
    </VStack>
  );
};

export default AttendanceButton;
