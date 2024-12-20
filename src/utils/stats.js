// src/utils/stats.js
import { isLateCheckIn } from './dateTime';  // 添加這行導入

export const calculateAttendanceStats = (attendanceRecords) => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
  
  // 過濾最近30天的記錄
  const recentRecords = attendanceRecords.filter(record => 
    new Date(record.check_in_time) >= thirtyDaysAgo
  );

  const onTimeRecords = recentRecords.filter(record => !isLateCheckIn(record.check_in_time));
  const onTimePercentage = (onTimeRecords.length / recentRecords.length * 100) || 0;

  let currentStreak = 0;
  let lastDate = null;

  // 計算當前連續準時天數
  for (let i = attendanceRecords.length - 1; i >= 0; i--) {
    const record = attendanceRecords[i];
    const recordDate = new Date(record.check_in_time);
    
    if (!isLateCheckIn(record.check_in_time)) {
      if (!lastDate) {
        lastDate = recordDate;
        currentStreak = 1;
      } else {
        const dayDiff = Math.floor((lastDate - recordDate) / (1000 * 60 * 60 * 24));
        if (dayDiff === 1) {
          currentStreak++;
          lastDate = recordDate;
        } else {
          break;
        }
      }
    } else {
      break;
    }
  }

  return {
    totalCheckins: recentRecords.length,
    onTimePercentage: Math.round(onTimePercentage),
    currentStreak,
  };
};