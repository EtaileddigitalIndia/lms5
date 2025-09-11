/*
  # Complete Course Management System

  1. New Tables
    - `courses` - Main course information with pricing and metadata
    - `course_modules` - Modules within courses with ordering
    - `module_videos` - YouTube videos for modules
    - Enhanced existing tables with better relationships

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users and admins
    - Maintain existing security for modules, lessons, etc.

  3. Features
    - Course creation with full metadata
    - Module management with video integration
    - YouTube video embedding and duration tracking
    - Export/import functionality
    - Automatic statistics calculation
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  thumbnail text,
  price decimal(10,2) DEFAULT 0,
  currency text DEFAULT 'USD',
  student_count integer DEFAULT 0,
  total_duration integer DEFAULT 0,
  module_count integer DEFAULT 0,
  level text DEFAULT 'intermediate',
  category text DEFAULT 'General',
  tags text[] DEFAULT '{}',
  job_guarantee boolean DEFAULT false,
  certificate_template text DEFAULT 'standard',
  instructor_id text,
  instructor_name text DEFAULT 'Digital Marketing Institute',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create course_modules table
CREATE TABLE IF NOT EXISTS course_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  order_index integer NOT NULL,
  duration integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create module_videos table
CREATE TABLE IF NOT EXISTS module_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES course_modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  youtube_url text NOT NULL,
  youtube_id text NOT NULL,
  duration integer DEFAULT 0,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add course_id to existing modules table if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'modules' AND column_name = 'course_id'
  ) THEN
    ALTER TABLE modules ADD COLUMN course_id uuid REFERENCES courses(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_course_modules_order ON course_modules(order_index);
CREATE INDEX IF NOT EXISTS idx_module_videos_module_id ON module_videos(module_id);
CREATE INDEX IF NOT EXISTS idx_module_videos_order ON module_videos(order_index);

-- Enable RLS on new tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_videos ENABLE ROW LEVEL SECURITY;

-- Create policies for courses
CREATE POLICY "Anyone can read courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage courses"
  ON courses
  FOR ALL
  TO authenticated
  USING ((jwt() ->> 'role'::text) = 'admin'::text);

-- Create policies for course_modules
CREATE POLICY "Anyone can read course modules"
  ON course_modules
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage course modules"
  ON course_modules
  FOR ALL
  TO authenticated
  USING ((jwt() ->> 'role'::text) = 'admin'::text);

-- Create policies for module_videos
CREATE POLICY "Anyone can read module videos"
  ON module_videos
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage module videos"
  ON module_videos
  FOR ALL
  TO authenticated
  USING ((jwt() ->> 'role'::text) = 'admin'::text);

-- Create function to update course statistics
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

-- Create function to update module duration
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

-- Create triggers to auto-update statistics
CREATE TRIGGER update_course_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON course_modules
  FOR EACH ROW EXECUTE FUNCTION update_course_stats();

CREATE TRIGGER update_module_duration_trigger
  AFTER INSERT OR UPDATE OR DELETE ON module_videos
  FOR EACH ROW EXECUTE FUNCTION update_module_duration();

-- Create triggers for updated_at
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_modules_updated_at
  BEFORE UPDATE ON course_modules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();