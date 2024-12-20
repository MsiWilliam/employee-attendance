// src/utils/dateTime.js
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const isLateCheckIn = (checkInTime) => {
  const time = new Date(checkInTime);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  
  // 9:00 AM 之後視為遲到
  return hours > 9 || (hours === 9 && minutes > 0);
};