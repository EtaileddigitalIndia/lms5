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
    // For demo purposes, return a random duration
    // In production, you would call YouTube Data API v3
    return Math.floor(Math.random() * 30) + 5; // 5-35 minutes
  }

  // Course CRUD operations
  static async createCourse(courseData: Omit<CourseData, 'id' | 'createdAt' | 'updatedAt'>): Promise<CourseData> {
    const { data, error } = await supabase
      .from('courses')
      .insert({
        title: courseData.title,
        description: courseData.description,
        thumbnail: courseData.thumbnail,
        price: courseData.price,
        currency: courseData.currency,
        student_count: courseData.studentCount
      })
      .select()
      .single();

    if (error) throw error;

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
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
  }

  static async getAllCourses(): Promise<CourseData[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail,
      price: course.price,
      currency: course.currency,
      studentCount: course.student_count,
      totalDuration: course.total_duration,
      moduleCount: course.module_count,
      createdAt: new Date(course.created_at),
      updatedAt: new Date(course.updated_at)
    }));
  }

  static async getCourseById(id: string): Promise<CourseData> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

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
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
  }

  static async updateCourse(id: string, updates: Partial<CourseData>): Promise<CourseData> {
    const { data, error } = await supabase
      .from('courses')
      .update({
        title: updates.title,
        description: updates.description,
        thumbnail: updates.thumbnail,
        price: updates.price,
        currency: updates.currency,
        student_count: updates.studentCount
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

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
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
  }

  static async deleteCourse(id: string): Promise<void> {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Module CRUD operations
  static async createModule(courseId: string, moduleData: Omit<CourseModule, 'id' | 'courseId' | 'videos' | 'createdAt' | 'updatedAt'>): Promise<CourseModule> {
    const { data, error } = await supabase
      .from('course_modules')
      .insert({
        course_id: courseId,
        title: moduleData.title,
        description: moduleData.description,
        order_index: moduleData.orderIndex
      })
      .select()
      .single();

    if (error) throw error;

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
  }

  static async getCourseModules(courseId: string): Promise<CourseModule[]> {
    const { data, error } = await supabase
      .from('course_modules')
      .select(`
        *,
        module_videos (*)
      `)
      .eq('course_id', courseId)
      .order('order_index');

    if (error) throw error;

    return data.map(module => ({
      id: module.id,
      courseId: module.course_id,
      title: module.title,
      description: module.description,
      orderIndex: module.order_index,
      duration: module.duration,
      videos: module.module_videos.map((video: any) => ({
        id: video.id,
        moduleId: video.module_id,
        title: video.title,
        youtubeUrl: video.youtube_url,
        youtubeId: video.youtube_id,
        duration: video.duration,
        orderIndex: video.order_index,
        createdAt: new Date(video.created_at)
      })),
      createdAt: new Date(module.created_at),
      updatedAt: new Date(module.updated_at)
    }));
  }

  static async updateModule(id: string, updates: Partial<CourseModule>): Promise<CourseModule> {
    const { data, error } = await supabase
      .from('course_modules')
      .update({
        title: updates.title,
        description: updates.description,
        order_index: updates.orderIndex
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

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
  }

  static async deleteModule(id: string): Promise<void> {
    const { error } = await supabase
      .from('course_modules')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Video CRUD operations
  static async addVideoToModule(moduleId: string, videoData: { title: string; youtubeUrl: string; orderIndex: number }): Promise<ModuleVideo> {
    const youtubeId = this.extractYouTubeId(videoData.youtubeUrl);
    if (!youtubeId) {
      throw new Error('Invalid YouTube URL');
    }

    const duration = await this.getYouTubeDuration(youtubeId);

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

    if (error) throw error;

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
  }

  static async deleteVideo(id: string): Promise<void> {
    const { error } = await supabase
      .from('module_videos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Export/Import functionality
  static async exportCourse(courseId: string): Promise<string> {
    const course = await this.getCourseById(courseId);
    const modules = await this.getCourseModules(courseId);

    const exportData = {
      course,
      modules
    };

    return JSON.stringify(exportData, null, 2);
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
        studentCount: 0
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
      throw new Error('Invalid JSON format or import failed: ' + error);
    }
  }
}