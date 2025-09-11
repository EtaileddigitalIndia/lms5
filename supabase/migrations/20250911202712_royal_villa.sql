/*
  # Disable RLS for courses tables

  1. Changes
    - Disable Row Level Security on courses table
    - Disable Row Level Security on course_modules table  
    - Disable Row Level Security on module_videos table
    - This allows all operations without policy restrictions

  2. Security
    - RLS disabled for development purposes
    - Can be re-enabled later with proper policies
*/

-- Disable RLS on courses tables to allow operations
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules DISABLE ROW LEVEL SECURITY;
ALTER TABLE module_videos DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies since RLS is disabled
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON courses;
DROP POLICY IF EXISTS "Allow public read access" ON courses;
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON course_modules;
DROP POLICY IF EXISTS "Allow public read access" ON course_modules;
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON module_videos;
DROP POLICY IF EXISTS "Allow public read access" ON module_videos;