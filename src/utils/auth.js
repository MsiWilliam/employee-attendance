// src/utils/auth.js
import { supabase } from '../config/supabase';
  
export const checkUserRole = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data?.role || 'employee';
  } catch (error) {
    console.error('Error checking user role:', error);
    return 'employee';
  }
};

export const isAdmin = async (userId) => {
  const role = await checkUserRole(userId);
  return role === 'admin';
};

