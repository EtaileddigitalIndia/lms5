/*
  # Complete Course Management System

  1. New Tables
    - `courses` - Main course information
    - `course_modules` - Modules within courses  
    - `module_videos` - YouTube videos for modules
    - Update existing tables to work with new course system

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users and admins

  3. Functions
    - Auto-update course statistics when modules change
    - Calculate total duration from videos
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  thumbnail text DEFAULT 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
  price decimal(10,2) DEFAULT 0,
  currency text DEFAULT 'INR',
  student_count integer DEFAULT 0,
  total_duration integer DEFAULT 0,
  module_count integer DEFAULT 0,
  level text DEFAULT 'intermediate',
  category text DEFAULT 'Digital Marketing',
  tags text[] DEFAULT ARRAY[]::text[],
  job_guarantee boolean DEFAULT false,
  certificate_template text DEFAULT 'professional',
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

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_videos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses
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

-- RLS Policies for course_modules
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

-- RLS Policies for module_videos
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
      SELECT COALESCE(SUM(cm.duration), 0)
      FROM course_modules cm
      WHERE cm.course_id = COALESCE(NEW.course_id, OLD.course_id)
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

-- Triggers for automatic updates
DROP TRIGGER IF EXISTS update_course_stats_trigger ON course_modules;
CREATE TRIGGER update_course_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON course_modules
  FOR EACH ROW EXECUTE FUNCTION update_course_stats();

DROP TRIGGER IF EXISTS update_module_duration_trigger ON module_videos;
CREATE TRIGGER update_module_duration_trigger
  AFTER INSERT OR UPDATE OR DELETE ON module_videos
  FOR EACH ROW EXECUTE FUNCTION update_module_duration();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_course_modules_order ON course_modules(order_index);
CREATE INDEX IF NOT EXISTS idx_module_videos_module_id ON module_videos(module_id);
CREATE INDEX IF NOT EXISTS idx_module_videos_order ON module_videos(order_index);

-- Insert sample course data
INSERT INTO courses (title, description, price, currency, job_guarantee, level, category) VALUES
('Certified E-Commerce & Digital Marketing Professional', 
 'Complete professional certification program with job guarantee. Master e-commerce, digital marketing, and scale to multi-million dollar business.',
 118000, 'INR', true, 'intermediate', 'Digital Marketing')
ON CONFLICT DO NOTHING;