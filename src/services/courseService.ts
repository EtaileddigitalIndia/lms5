import { supabase } from '../lib/supabase';
import { CourseData, CourseModule, ModuleVideo } from '../types/course';

export class CourseService {
  // Extract YouTube video ID from URL
  static extractYouTubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  // Get video duration from YouTube API (simplified - in production you'd use YouTube API)
  static async getYouTubeDuration(videoId: string): Promise<number> {
    // For demo purposes, return a random duration between 5-35 minutes
    // In production, you would call YouTube Data API v3
    return Math.floor(Math.random() * 30) + 5;
  }

  // Course CRUD operations
  static async createCourse(courseData: Omit<CourseData, 'id' | 'createdAt' | 'updatedAt'>): Promise<CourseData> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert({
          title: courseData.title,
          description: courseData.description,
          thumbnail: courseData.thumbnail,
          price: courseData.price,
          currency: courseData.currency,
          student_count: courseData.studentCount || 0,
          total_duration: courseData.totalDuration || 0,
          module_count: courseData.moduleCount || 0,
          level: courseData.level || 'intermediate',
          category: courseData.category || 'General',
          tags: courseData.tags || [],
          job_guarantee: courseData.jobGuarantee || false,
          certificate_template: courseData.certificateTemplate || 'standard'
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        price: data.price,
        currency: data.currency,
        studentCount: data.student_count,
        totalDuration: data.total_duration,
        moduleCount: data.module_count,
        level: data.level,
        category: data.category,
        tags: data.tags,
        jobGuarantee: data.job_guarantee,
        certificateTemplate: data.certificate_template,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };
    } catch (error) {
      console.error('Supabase request failed', error);
      throw error;
    }
  }

  static async getAllCourses(): Promise<CourseData[]> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return (data || []).map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        price: course.price,
        currency: course.currency,
        studentCount: course.student_count,
        totalDuration: course.total_duration,
        moduleCount: course.module_count,
        level: course.level,
        category: course.category,
        tags: course.tags,
        jobGuarantee: course.job_guarantee,
        certificateTemplate: course.certificate_template,
        createdAt: new Date(course.created_at),
        updatedAt: new Date(course.updated_at)
      }));
    } catch (error) {
      console.error('Supabase request failed', error);
      throw error;
    }
  }

  static async getCourseById(id: string): Promise<CourseData> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        price: data.price,
        currency: data.currency,
        studentCount: data.student_count,
        totalDuration: data.total_duration,
        moduleCount: data.module_count,
        level: data.level,
        category: data.category,
        tags: data.tags,
        jobGuarantee: data.job_guarantee,
        certificateTemplate: data.certificate_template,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };
    } catch (error) {
      console.error('Supabase request failed', error);
      throw error;
    }
  }

  static async updateCourse(id: string, updates: Partial<CourseData>): Promise<CourseData> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .update({
          title: updates.title,
          description: updates.description,
          thumbnail: updates.thumbnail,
          price: updates.price,
          currency: updates.currency,
          student_count: updates.studentCount,
          level: updates.level,
          category: updates.category,
          tags: updates.tags,
          job_guarantee: updates.jobGuarantee,
          certificate_template: updates.certificateTemplate,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        price: data.price,
        currency: data.currency,
        studentCount: data.student_count,
        totalDuration: data.total_duration,
        moduleCount: data.module_count,
        level: data.level,
        category: data.category,
        tags: data.tags,
        jobGuarantee: data.job_guarantee,
        certificateTemplate: data.certificate_template,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };
    } catch (error) {
      console.error('Supabase request failed', error);
      throw error;
    }
  }

  static async deleteCourse(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Supabase request failed', error);
      throw error;
    }
  }

  // Module CRUD operations
  static async createModule(courseId: string, moduleData: Omit<CourseModule, 'id' | 'courseId' | 'videos' | 'createdAt' | 'updatedAt'>): Promise<CourseModule> {
    try {
      const { data, error } = await supabase
        .from('course_modules')
        .insert({
          course_id: courseId,
          title: moduleData.title,
          description: moduleData.description,
          order_index: moduleData.orderIndex,
          duration: moduleData.duration || 0
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return {
        id: data.id,
        courseId: data.course_id,
        title: data.title,
        description: data.description,
        orderIndex: data.order_index,
        duration: data.duration,
        videos: [],
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };
    } catch (error) {
      console.error('Supabase request failed', error);
      throw error;
    }
  }

  static async getCourseModules(courseId: string): Promise<CourseModule[]> {
    try {
      const { data, error } = await supabase
        .from('course_modules')
        .select(`
          *,
          module_videos (*)
        `)
        .eq('course_id', courseId)
        .order('order_index');

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return (data || []).map(module => ({
        id: module.id,
        courseId: module.course_id,
        title: module.title,
        description: module.description,
        orderIndex: module.order_index,
        duration: module.duration,
        videos: (module.module_videos || []).map((video: any) => ({
          id: video.id,
          moduleId: video.module_id,
          title: video.title,
          youtubeUrl: video.youtube_url,
          youtubeId: video.youtube_id,
          duration: video.duration,
          orderIndex: video.order_index,
          createdAt: new Date(video.created_at)
        })).sort((a: ModuleVideo, b: ModuleVideo) => a.orderIndex - b.orderIndex),
        createdAt: new Date(module.created_at),
        updatedAt: new Date(module.updated_at)
      }));
    } catch (error) {
      console.error('Supabase request failed', error);
      throw error;
    }
  }

  static async updateModule(id: string, updates: Partial<CourseModule>): Promise<CourseModule> {
    try {
      const { data, error } = await supabase
        .from('course_modules')
        .update({
          title: updates.title,
          description: updates.description,
          order_index: updates.orderIndex,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return {
        id: data.id,
        courseId: data.course_id,
        title: data.title,
        description: data.description,
        orderIndex: data.order_index,
        duration: data.duration,
        videos: [],
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };
    } catch (error) {
      console.error('Supabase request failed', error);
      throw error;
    }
  }

  static async deleteModule(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('course_modules')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Supabase request failed', error);
      throw error;
    }
  }

  // Video CRUD operations
  static async addVideoToModule(moduleId: string, videoData: { title: string; youtubeUrl: string; orderIndex: number }): Promise<ModuleVideo> {
    const youtubeId = this.extractYouTubeId(videoData.youtubeUrl);
    if (!youtubeId) {
      throw new Error('Invalid YouTube URL. Please provide a valid YouTube video URL.');
    }

    const duration = await this.getYouTubeDuration(youtubeId);

    try {
      const { data, error } = await supabase
        .from('module_videos')
        .insert({
          module_id: moduleId,
          title: videoData.title,
          youtube_url: videoData.youtubeUrl,
          youtube_id: youtubeId,
          duration: duration,
          order_index: videoData.orderIndex
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return {
        id: data.id,
        moduleId: data.module_id,
        title: data.title,
        youtubeUrl: data.youtube_url,
        youtubeId: data.youtube_id,
        duration: data.duration,
        orderIndex: data.order_index,
        createdAt: new Date(data.created_at)
      };
    } catch (error) {
      console.error('Supabase request failed', error);
      throw error;
    }
  }

  static async deleteVideo(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('module_videos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Supabase request failed', error);
      throw error;
    }
  }

  static async updateVideoOrder(videoId: string, newOrder: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('module_videos')
        .update({ order_index: newOrder })
        .eq('id', videoId);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Supabase request failed', error);
      throw error;
    }
  }

  // Export/Import functionality
  static async exportCourse(courseId: string): Promise<string> {
    try {
      const course = await this.getCourseById(courseId);
      const modules = await this.getCourseModules(courseId);

      const exportData = {
        course,
        modules
      };

      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Export failed', error);
      throw error;
    }
  }

  static async importCourse(jsonData: string): Promise<CourseData> {
    try {
      const importData = JSON.parse(jsonData);
      const { course, modules } = importData;

      // Create the course
      const createdCourse = await this.createCourse({
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        price: course.price,
        currency: course.currency,
        studentCount: 0,
        totalDuration: 0,
        moduleCount: 0,
        level: course.level,
        category: course.category,
        tags: course.tags,
        jobGuarantee: course.jobGuarantee,
        certificateTemplate: course.certificateTemplate
      });

      // Create modules and videos
      for (const module of modules) {
        const createdModule = await this.createModule(createdCourse.id, {
          title: module.title,
          description: module.description,
          orderIndex: module.orderIndex,
          duration: 0
        });

        // Add videos to module
        for (const video of module.videos) {
          await this.addVideoToModule(createdModule.id, {
            title: video.title,
            youtubeUrl: video.youtubeUrl,
            orderIndex: video.orderIndex
          });
        }
      }

      return createdCourse;
    } catch (error) {
      console.error('Import error:', error);
      throw new Error('Invalid JSON format or import failed: ' + error);
    }
  }

  // Get course with full details including modules and videos
  static async getCourseWithDetails(courseId: string): Promise<CourseData & { modules: CourseModule[] }> {
    const course = await this.getCourseById(courseId);
    const modules = await this.getCourseModules(courseId);

    return {
      ...course,
      modules
    };
  }
}