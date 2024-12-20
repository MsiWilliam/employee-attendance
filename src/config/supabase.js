// src/config/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cafdqgkrvveyzaicopsj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZmRxZ2tydnZleXphaWNvcHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2NzExODIsImV4cCI6MjA1MDI0NzE4Mn0.x4MNpotT-akUU6IoFGY7q9uN-0PZxnL5AEPyEWqLBDE';

export const supabase = createClient(supabaseUrl, supabaseKey);