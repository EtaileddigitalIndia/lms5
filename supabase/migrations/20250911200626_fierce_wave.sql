/*
  # Create courses and course management tables

  1. New Tables
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `thumbnail` (text, optional)
      - `price` (numeric)
      - `currency` (text, default 'INR')
      - `student_count` (integer, default 0)
      - `total_duration` (integer, default 0)
      - `module_count` (integer, default 0)
      - `level` (text, default 'intermediate')
      - `category` (text)
      - `tags` (text array)
      - `job_guarantee` (boolean, default false)
      - `certificate_template` (text, default 'standard')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `course_modules`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key to courses)
      - `title` (text)
      - `description` (text)
      - `order_index` (integer)
      - `duration` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `module_videos`
      - `id` (uuid, primary key)
      - `module_id` (uuid, foreign key to course_modules)
      - `title` (text)
      - `youtube_url` (text)
      - `youtube_id` (text)
      - `duration` (integer)
      - `order_index` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
    - Admins can manage all courses
    - Anyone can read published courses
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  thumbnail text,
  price numeric DEFAULT 0,
  currency text DEFAULT 'INR',
  student_count integer DEFAULT 0,
  total_duration integer DEFAULT 0,
  module_count integer DEFAULT 0,
  level text DEFAULT 'intermediate',
  category text DEFAULT 'General',
  tags text[] DEFAULT '{}',
  job_guarantee boolean DEFAULT false,
  certificate_template text DEFAULT 'standard',
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_course_modules_order ON course_modules(order_index);
CREATE INDEX IF NOT EXISTS idx_module_videos_module_id ON module_videos(module_id);
CREATE INDEX IF NOT EXISTS idx_module_videos_order ON module_videos(order_index);

-- Enable Row Level Security
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

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION update_course_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_course_updated_at();

CREATE TRIGGER update_course_modules_updated_at
  BEFORE UPDATE ON course_modules
  FOR EACH ROW
  EXECUTE FUNCTION update_course_updated_at();

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

-- Function to update module duration
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

-- Create triggers for automatic stats updates
CREATE TRIGGER update_course_stats_on_module_change
  AFTER INSERT OR UPDATE OR DELETE ON course_modules
  FOR EACH ROW
  EXECUTE FUNCTION update_course_stats();

CREATE TRIGGER update_module_duration_on_video_change
  AFTER INSERT OR UPDATE OR DELETE ON module_videos
  FOR EACH ROW
  EXECUTE FUNCTION update_module_duration();