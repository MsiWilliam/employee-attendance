// src/components/Dashboard/DashboardStats.js
import React from 'react';
import {
  SimpleGrid,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';

const DashboardStats = ({ stats }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
      <Stat
        px={{ base: 2, md: 4 }}
        py="5"
        shadow="sm"
        border="1px solid"
        borderColor="gray.200"
        rounded="lg"
      >
        <StatLabel>Total Check-ins</StatLabel>
        <StatNumber>{stats.totalCheckins}</StatNumber>
        <StatHelpText>This month</StatHelpText>
      </Stat>

      <Stat
        px={{ base: 2, md: 4 }}
        py="5"
        shadow="sm"
        border="1px solid"
        borderColor="gray.200"
        rounded="lg"
      >
        <StatLabel>On Time Rate</StatLabel>
        <StatNumber>{stats.onTimePercentage}%</StatNumber>
        <StatHelpText>Last 30 days</StatHelpText>
      </Stat>

      <Stat
        px={{ base: 2, md: 4 }}
        py="5"
        shadow="sm"
        border="1px solid"
        borderColor="gray.200"
        rounded="lg"
      >
        <StatLabel>Current Streak</StatLabel>
        <StatNumber>{stats.currentStreak}</StatNumber>
        <StatHelpText>Days on time</StatHelpText>
      </Stat>
    </SimpleGrid>
  );
};

export default DashboardStats;