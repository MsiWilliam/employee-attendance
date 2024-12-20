// src/components/Layout/Navbar.js
import React from 'react';
import {
  Box,
  Flex,
  Button,
  Heading,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <Box bg="white" px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading size="md">
          <Link to="/">Employee Attendance</Link>
        </Heading>
        
        <Stack direction="row" spacing={4} alignItems="center">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin">
                  <Button variant="ghost">Admin Panel</Button>
                </Link>
              )}
              <Menu>
                <MenuButton as={Button} variant="ghost">
                  <Avatar size="sm" name={user.email} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Link to="/">
              <Button colorScheme="blue">Sign In</Button>
            </Link>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;


