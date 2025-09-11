/*
  # Fix Row-Level Security Policies

  1. Security Changes
    - Update RLS policies to allow authenticated users to create and read courses
    - Simplify policies to work with standard Supabase authentication
    - Allow all authenticated users to manage courses for admin functionality
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read courses" ON courses;
DROP POLICY IF EXISTS "Admins can manage courses" ON courses;
DROP POLICY IF EXISTS "Anyone can read course modules" ON course_modules;
DROP POLICY IF EXISTS "Admins can manage course modules" ON course_modules;
DROP POLICY IF EXISTS "Anyone can read module videos" ON module_videos;
DROP POLICY IF EXISTS "Admins can manage module videos" ON module_videos;

-- Create new simplified policies for courses
CREATE POLICY "Enable read access for authenticated users" ON courses
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert access for authenticated users" ON courses
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update access for authenticated users" ON courses
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable delete access for authenticated users" ON courses
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create new simplified policies for course_modules
CREATE POLICY "Enable read access for authenticated users" ON course_modules
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert access for authenticated users" ON course_modules
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update access for authenticated users" ON course_modules
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable delete access for authenticated users" ON course_modules
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create new simplified policies for module_videos
CREATE POLICY "Enable read access for authenticated users" ON module_videos
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert access for authenticated users" ON module_videos
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update access for authenticated users" ON module_videos
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable delete access for authenticated users" ON module_videos
  FOR DELETE USING (auth.uid() IS NOT NULL);