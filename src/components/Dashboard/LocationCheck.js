import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Progress,
  VStack,
} from '@chakra-ui/react';
import { checkDistance } from '../../utils/location';

const LocationCheck = ({ companyLocation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setCurrentLocation(location);
          if (companyLocation) {
            const dist = checkDistance(location, companyLocation);
            setDistance(dist);
          }
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, [companyLocation]);

  if (loading) {
    return (
      <VStack spacing={3}>
        <Spinner size="lg" />
        <Text>Getting your location...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  const distanceInMeters = distance * 1000;
  const isInRange = distanceInMeters <= 100;

  return (
    <Box>
      {currentLocation && (
        <VStack spacing={2} align="stretch">
          <Text fontSize="sm">
            Your location: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
          </Text>
          <Text fontSize="sm">
            Distance from office: {distanceInMeters.toFixed(0)} meters
          </Text>
          <Alert status={isInRange ? "success" : "warning"}>
            <AlertIcon />
            {isInRange 
              ? "You are within range to check in"
              : "You must be closer to the office to check in"}
          </Alert>
          <Progress
            value={100 - (distanceInMeters > 100 ? 100 : distanceInMeters)}
            colorScheme={isInRange ? "green" : "orange"}
            size="sm"
          />
        </VStack>
      )}
    </Box>
  );
};

export default LocationCheck;