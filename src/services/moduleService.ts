import { supabase } from '../lib/supabase'
import { Module, Lesson, CourseMaterial, Quiz, Assignment } from '../types/course'

export class ModuleService {
  // Module CRUD operations
  static async createModule(moduleData: Omit<Module, 'id' | 'lessons' | 'completed'>): Promise<Module> {
    const { data, error } = await supabase
      .from('modules')
      .insert({
        title: moduleData.title,
        description: moduleData.description,
        order: moduleData.order
      })
      .select()
      .single()

    if (error) throw error

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      order: data.order,
      lessons: [],
      completed: false
    }
  }

  static async getAllModules(): Promise<Module[]> {
    const { data: modules, error } = await supabase
      .from('modules')
      .select(`
        *,
        lessons (
          *,
          course_materials (*),
          quizzes (
            *,
            quiz_questions (*)
          ),
          assignments (*)
        )
      `)
      .order('order')

    if (error) throw error

    return modules.map(module => ({
      id: module.id,
      title: module.title,
      description: module.description,
      order: module.order,
      completed: false,
      lessons: module.lessons.map((lesson: any) => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        duration: lesson.duration,
        order: lesson.order,
        completed: false,
        materials: lesson.course_materials.map((material: any) => ({
          id: material.id,
          type: material.type,
          title: material.title,
          url: material.url,
          description: material.description,
          fileSize: material.file_size,
          downloadable: material.downloadable
        })),
        quiz: lesson.quizzes[0] ? {
          id: lesson.quizzes[0].id,
          title: lesson.quizzes[0].title,
          description: lesson.quizzes[0].description,
          timeLimit: lesson.quizzes[0].time_limit,
          passingScore: lesson.quizzes[0].passing_score,
          maxAttempts: lesson.quizzes[0].max_attempts,
          attempts: [],
          questions: lesson.quizzes[0].quiz_questions.map((q: any) => ({
            id: q.id,
            question: q.question,
            type: q.type,
            options: q.options,
            correctAnswer: q.correct_answer,
            explanation: q.explanation,
            points: q.points
          }))
        } : undefined,
        assignment: lesson.assignments[0] ? {
          id: lesson.assignments[0].id,
          title: lesson.assignments[0].title,
          description: lesson.assignments[0].description,
          instructions: lesson.assignments[0].instructions,
          maxScore: lesson.assignments[0].max_score,
          submissionType: lesson.assignments[0].submission_type,
          dueDate: lesson.assignments[0].due_date ? new Date(lesson.assignments[0].due_date) : undefined,
          submissions: []
        } : undefined,
        videoUrl: lesson.video_url
      }))
    }))
  }

  static async updateModule(id: string, updates: Partial<Module>): Promise<Module> {
    const { data, error } = await supabase
      .from('modules')
      .update({
        title: updates.title,
        description: updates.description,
        order: updates.order
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Get full module with lessons
    const fullModule = await this.getModuleById(id)
    return fullModule
  }

  static async deleteModule(id: string): Promise<void> {
    const { error } = await supabase
      .from('modules')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  static async getModuleById(id: string): Promise<Module> {
    const modules = await this.getAllModules()
    const module = modules.find(m => m.id === id)
    if (!module) throw new Error('Module not found')
    return module
  }

  // Lesson CRUD operations
  static async createLesson(moduleId: string, lessonData: Omit<Lesson, 'id' | 'materials' | 'completed'>): Promise<Lesson> {
    const { data, error } = await supabase
      .from('lessons')
      .insert({
        module_id: moduleId,
        title: lessonData.title,
        description: lessonData.description,
        duration: lessonData.duration,
        order: lessonData.order,
        video_url: lessonData.videoUrl
      })
      .select()
      .single()

    if (error) throw error

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      duration: data.duration,
      order: data.order,
      completed: false,
      materials: [],
      videoUrl: data.video_url
    }
  }

  static async updateLesson(id: string, updates: Partial<Lesson>): Promise<Lesson> {
    const { data, error } = await supabase
      .from('lessons')
      .update({
        title: updates.title,
        description: updates.description,
        duration: updates.duration,
        order: updates.order,
        video_url: updates.videoUrl
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      duration: data.duration,
      order: data.order,
      completed: false,
      materials: [],
      videoUrl: data.video_url
    }
  }

  static async deleteLesson(id: string): Promise<void> {
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Material CRUD operations
  static async addMaterial(lessonId: string, material: Omit<CourseMaterial, 'id'>): Promise<CourseMaterial> {
    const { data, error } = await supabase
      .from('course_materials')
      .insert({
        lesson_id: lessonId,
        type: material.type,
        title: material.title,
        url: material.url,
        description: material.description,
        file_size: material.fileSize,
        downloadable: material.downloadable || false
      })
      .select()
      .single()

    if (error) throw error

    return {
      id: data.id,
      type: data.type,
      title: data.title,
      url: data.url,
      description: data.description,
      fileSize: data.file_size,
      downloadable: data.downloadable
    }
  }

  static async deleteMaterial(id: string): Promise<void> {
    const { error } = await supabase
      .from('course_materials')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Quiz CRUD operations
  static async createQuiz(lessonId: string, quiz: Omit<Quiz, 'id' | 'attempts'>): Promise<Quiz> {
    const { data: quizData, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        lesson_id: lessonId,
        title: quiz.title,
        description: quiz.description,
        time_limit: quiz.timeLimit,
        passing_score: quiz.passingScore,
        max_attempts: quiz.maxAttempts
      })
      .select()
      .single()

    if (quizError) throw quizError

    // Insert questions
    if (quiz.questions.length > 0) {
      const { error: questionsError } = await supabase
        .from('quiz_questions')
        .insert(
          quiz.questions.map((q, index) => ({
            quiz_id: quizData.id,
            question: q.question,
            type: q.type,
            options: q.options,
            correct_answer: Array.isArray(q.correctAnswer) ? q.correctAnswer.join(',') : q.correctAnswer,
            explanation: q.explanation,
            points: q.points,
            order: index + 1
          }))
        )

      if (questionsError) throw questionsError
    }

    return {
      id: quizData.id,
      title: quizData.title,
      description: quizData.description,
      timeLimit: quizData.time_limit,
      passingScore: quizData.passing_score,
      maxAttempts: quizData.max_attempts,
      questions: quiz.questions,
      attempts: []
    }
  }

  static async deleteQuiz(id: string): Promise<void> {
    const { error } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Assignment CRUD operations
  static async createAssignment(lessonId: string, assignment: Omit<Assignment, 'id' | 'submissions'>): Promise<Assignment> {
    const { data, error } = await supabase
      .from('assignments')
      .insert({
        lesson_id: lessonId,
        title: assignment.title,
        description: assignment.description,
        instructions: assignment.instructions,
        max_score: assignment.maxScore,
        submission_type: assignment.submissionType,
        due_date: assignment.dueDate?.toISOString()
      })
      .select()
      .single()

    if (error) throw error

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      instructions: data.instructions,
      maxScore: data.max_score,
      submissionType: data.submission_type,
      dueDate: data.due_date ? new Date(data.due_date) : undefined,
      submissions: []
    }
  }

  static async deleteAssignment(id: string): Promise<void> {
    const { error } = await supabase
      .from('assignments')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Export/Import functionality
  static async exportModules(): Promise<string> {
    const modules = await this.getAllModules()
    return JSON.stringify(modules, null, 2)
  }

  static async importModules(jsonData: string): Promise<void> {
    try {
      const modules: Module[] = JSON.parse(jsonData)
      
      for (const module of modules) {
        // Create module
        const createdModule = await this.createModule({
          title: module.title,
          description: module.description,
          order: module.order
        })

        // Create lessons for this module
        for (const lesson of module.lessons) {
          const createdLesson = await this.createLesson(createdModule.id, {
            title: lesson.title,
            description: lesson.description,
            duration: lesson.duration,
            order: lesson.order,
            videoUrl: lesson.videoUrl
          })

          // Add materials
          for (const material of lesson.materials) {
            await this.addMaterial(createdLesson.id, material)
          }

          // Add quiz if exists
          if (lesson.quiz) {
            await this.createQuiz(createdLesson.id, lesson.quiz)
          }

          // Add assignment if exists
          if (lesson.assignment) {
            await this.createAssignment(createdLesson.id, lesson.assignment)
          }
        }
      }
    } catch (error) {
      throw new Error('Invalid JSON format or import failed: ' + error)
    }
  }
}