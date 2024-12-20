// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import {
Box,
Container,
Heading,
VStack,
FormControl,
FormLabel,
Input,
Button,
useToast,
Avatar,
Text,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabase';

const ProfilePage = () => {
const { user } = useAuth();
const [profile, setProfile] = useState({
  name: '',
  email: '',
  department: '',
  phone: '',
  emergency_contact: '',
});
const [loading, setLoading] = useState(false);
const toast = useToast();

useEffect(() => {
  fetchProfile();
}, [user]);

const fetchProfile = async () => {
  try {
    if (user) {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    toast({
      title: 'Error',
      description: 'Failed to fetch profile data',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const { error } = await supabase
      .from('employees')
      .update({
        name: profile.name,
        phone: profile.phone,
        emergency_contact: profile.emergency_contact,
      })
      .eq('user_id', user.id);

    if (error) throw error;

    toast({
      title: 'Success',
      description: 'Profile updated successfully',
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
  } finally {
    setLoading(false);
  }
};

return (
  <Container maxW="container.md" py={10}>
    <VStack spacing={8} align="stretch">
      <Box bg="white" p={6} rounded="lg" shadow="base">
        <VStack spacing={6} align="center">
          <Avatar 
            size="2xl" 
            name={profile.name} 
            src={profile.avatar_url}
          />
          <Heading size="md">{profile.name}</Heading>
          <Text color="gray.600">{profile.department}</Text>
        </VStack>
      </Box>

      <Box bg="white" p={6} rounded="lg" shadow="base">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                value={profile.name}
                onChange={(e) => setProfile({
                  ...profile,
                  name: e.target.value
                })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={profile.email}
                isReadOnly
                bg="gray.50"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Department</FormLabel>
              <Input
                value={profile.department}
                isReadOnly
                bg="gray.50"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({
                  ...profile,
                  phone: e.target.value
                })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Emergency Contact</FormLabel>
              <Input
                value={profile.emergency_contact}
                onChange={(e) => setProfile({
                  ...profile,
                  emergency_contact: e.target.value
                })}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={loading}
              width="full"
            >
              Update Profile
            </Button>
          </VStack>
        </form>
      </Box>
    </VStack>
  </Container>
);
};

export default ProfilePage;