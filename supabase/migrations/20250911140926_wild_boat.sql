/*
  # Course Management System

  1. New Tables
    - `courses` - Main course information
    - `course_modules` - Modules within courses
    - `module_videos` - YouTube videos for modules
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  thumbnail text,
  price decimal(10,2) DEFAULT 0,
  currency text DEFAULT 'USD',
  student_count integer DEFAULT 0,
  total_duration integer DEFAULT 0, -- in minutes
  module_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage courses"
  ON courses
  FOR ALL
  TO authenticated
  USING ((jwt() ->> 'role'::text) = 'admin'::text);

CREATE POLICY "Anyone can read courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (true);

-- Course modules table (separate from the existing modules table)
CREATE TABLE IF NOT EXISTS course_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  order_index integer NOT NULL,
  duration integer DEFAULT 0, -- in minutes
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage course modules"
  ON course_modules
  FOR ALL
  TO authenticated
  USING ((jwt() ->> 'role'::text) = 'admin'::text);

CREATE POLICY "Anyone can read course modules"
  ON course_modules
  FOR SELECT
  TO authenticated
  USING (true);

-- Module videos table for YouTube integration
CREATE TABLE IF NOT EXISTS module_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES course_modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  youtube_url text NOT NULL,
  youtube_id text NOT NULL,
  duration integer DEFAULT 0, -- in minutes
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE module_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage module videos"
  ON module_videos
  FOR ALL
  TO authenticated
  USING ((jwt() ->> 'role'::text) = 'admin'::text);

CREATE POLICY "Anyone can read module videos"
  ON module_videos
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_course_modules_order ON course_modules(order_index);
CREATE INDEX IF NOT EXISTS idx_module_videos_module_id ON module_videos(module_id);
CREATE INDEX IF NOT EXISTS idx_module_videos_order ON module_videos(order_index);

-- Function to update course statistics
CREATE OR REPLACE FUNCTION update_course_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update module count and total duration for the course
  UPDATE courses 
  SET 
    module_count = (
      SELECT COUNT(*) 
      FROM course_modules 
      WHERE course_id = COALESCE(NEW.course_id, OLD.course_id)
    ),
    total_duration = (
      SELECT COALESCE(SUM(duration), 0) 
      FROM course_modules 
      WHERE course_id = COALESCE(NEW.course_id, OLD.course_id)
    ),
    updated_at = now()
  WHERE id = COALESCE(NEW.course_id, OLD.course_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update course stats
CREATE TRIGGER update_course_stats_on_module_change
  AFTER INSERT OR UPDATE OR DELETE ON course_modules
  FOR EACH ROW EXECUTE FUNCTION update_course_stats();

-- Function to update module duration based on videos
CREATE OR REPLACE FUNCTION update_module_duration()
RETURNS TRIGGER AS $$
BEGIN
  -- Update module duration based on videos
  UPDATE course_modules 
  SET 
    duration = (
      SELECT COALESCE(SUM(duration), 0) 
      FROM module_videos 
      WHERE module_id = COALESCE(NEW.module_id, OLD.module_id)
    ),
    updated_at = now()
  WHERE id = COALESCE(NEW.module_id, OLD.module_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update module duration
CREATE TRIGGER update_module_duration_on_video_change
  AFTER INSERT OR UPDATE OR DELETE ON module_videos
  FOR EACH ROW EXECUTE FUNCTION update_module_duration();