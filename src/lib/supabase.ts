import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string
          title: string
          description: string
          thumbnail: string | null
          price: number
          currency: string
          student_count: number
          total_duration: number
          module_count: number
          level: string
          category: string
          tags: string[]
          job_guarantee: boolean
          certificate_template: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          thumbnail?: string | null
          price?: number
          currency?: string
          student_count?: number
          total_duration?: number
          module_count?: number
          level?: string
          category?: string
          tags?: string[]
          job_guarantee?: boolean
          certificate_template?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          thumbnail?: string | null
          price?: number
          currency?: string
          student_count?: number
          total_duration?: number
          module_count?: number
          level?: string
          category?: string
          tags?: string[]
          job_guarantee?: boolean
          certificate_template?: string
          created_at?: string
          updated_at?: string
        }
      }
      course_modules: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string
          order_index: number
          duration: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description: string
          order_index: number
          duration?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string
          order_index?: number
          duration?: number
          created_at?: string
          updated_at?: string
        }
      }
      module_videos: {
        Row: {
          id: string
          module_id: string
          title: string
          youtube_url: string
          youtube_id: string
          duration: number
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          module_id: string
          title: string
          youtube_url: string
          youtube_id: string
          duration?: number
          order_index: number
          created_at?: string
        }
        Update: {
          id?: string
          module_id?: string
          title?: string
          youtube_url?: string
          youtube_id?: string
          duration?: number
          order_index?: number
          created_at?: string
        }
      }
      modules: {
        Row: {
          id: string
          title: string
          description: string
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          order: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          module_id: string
          title: string
          description: string
          duration: number
          order: number
          video_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          module_id: string
          title: string
          description: string
          duration: number
          order: number
          video_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          module_id?: string
          title?: string
          description?: string
          duration?: number
          order?: number
          video_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      course_materials: {
        Row: {
          id: string
          lesson_id: string
          type: string
          title: string
          url: string
          description: string | null
          file_size: string | null
          downloadable: boolean
          created_at: string
        }
        Insert: {
          id?: string
          lesson_id: string
          type: string
          title: string
          url: string
          description?: string | null
          file_size?: string | null
          downloadable?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          lesson_id?: string
          type?: string
          title?: string
          url?: string
          description?: string | null
          file_size?: string | null
          downloadable?: boolean
          created_at?: string
        }
      }
      quizzes: {
        Row: {
          id: string
          lesson_id: string
          title: string
          description: string
          time_limit: number | null
          passing_score: number
          max_attempts: number
          created_at: string
        }
        Insert: {
          id?: string
          lesson_id: string
          title: string
          description: string
          time_limit?: number | null
          passing_score: number
          max_attempts: number
          created_at?: string
        }
        Update: {
          id?: string
          lesson_id?: string
          title?: string
          description?: string
          time_limit?: number | null
          passing_score?: number
          max_attempts?: number
          created_at?: string
        }
      }
      quiz_questions: {
        Row: {
          id: string
          quiz_id: string
          question: string
          type: string
          options: string[] | null
          correct_answer: string
          explanation: string | null
          points: number
          order: number
        }
        Insert: {
          id?: string
          quiz_id: string
          question: string
          type: string
          options?: string[] | null
          correct_answer: string
          explanation?: string | null
          points: number
          order: number
        }
        Update: {
          id?: string
          quiz_id?: string
          question?: string
          type?: string
          options?: string[] | null
          correct_answer?: string
          explanation?: string | null
          points?: number
          order?: number
        }
      }
      assignments: {
        Row: {
          id: string
          lesson_id: string
          title: string
          description: string
          instructions: string
          max_score: number
          submission_type: string
          due_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          lesson_id: string
          title: string
          description: string
          instructions: string
          max_score: number
          submission_type: string
          due_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          lesson_id?: string
          title?: string
          description?: string
          instructions?: string
          max_score?: number
          submission_type?: string
          due_date?: string | null
          created_at?: string
        }
      }
    }
  }
}