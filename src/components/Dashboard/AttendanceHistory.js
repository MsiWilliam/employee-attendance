// src/components/Dashboard/AttendanceHistory.js
import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
} from '@chakra-ui/react';

const AttendanceHistory = ({ attendanceRecords }) => {
  if (!attendanceRecords || attendanceRecords.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Text>No attendance records found</Text>
      </Box>
    );
  }

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Time</Th>
            <Th>Location</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {attendanceRecords.map((record) => {
            const checkInTime = new Date(record.check_in_time);
            const isLate = checkInTime.getHours() >= 9 && checkInTime.getMinutes() > 0;
            
            return (
              <Tr key={record.id}>
                <Td>{checkInTime.toLocaleDateString()}</Td>
                <Td>{checkInTime.toLocaleTimeString()}</Td>
                <Td>
                  {record.location ? 
                    `${record.location.latitude.toFixed(6)}, ${record.location.longitude.toFixed(6)}` :
                    'Location not recorded'}
                </Td>
                <Td color={isLate ? "red.500" : "green.500"}>
                  {isLate ? 'Late' : 'On Time'}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AttendanceHistory;