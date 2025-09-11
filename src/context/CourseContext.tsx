import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course, StudentProgress, QuizAttempt, AssignmentSubmission } from '../types/course';
import { defaultCourse } from '../data/courseData';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface CourseContextType {
  courses: Course[];
  studentProgress: Record<string, StudentProgress>;
  enrollInCourse: (courseId: string) => void;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  submitQuizAttempt: (courseId: string, quizId: string, attempt: Omit<QuizAttempt, 'id'>) => void;
  submitAssignment: (courseId: string, assignmentId: string, submission: Omit<AssignmentSubmission, 'id'>) => void;
  getCourseProgress: (courseId: string) => StudentProgress | null;
  isLessonUnlocked: (courseId: string, lessonId: string) => boolean;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([defaultCourse]);
  const [studentProgress, setStudentProgress] = useState<Record<string, StudentProgress>>({});
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'student') {
      // Load student progress from localStorage
      const storedProgress = localStorage.getItem(`progress_${user.id}`);
      if (storedProgress) {
        setStudentProgress(JSON.parse(storedProgress));
      }
    }
  }, [user]);

  const saveProgress = (progress: Record<string, StudentProgress>) => {
    if (user) {
      localStorage.setItem(`progress_${user.id}`, JSON.stringify(progress));
      setStudentProgress(progress);
    }
  };

  const enrollInCourse = (courseId: string) => {
    if (!user) return;

    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Add student to course
    setCourses(prev => prev.map(c => 
      c.id === courseId 
        ? { ...c, students: [...c.students, user.id] }
        : c
    ));

    // Initialize progress
    const newProgress: StudentProgress = {
      studentId: user.id,
      courseId,
      completedLessons: [],
      completedModules: [],
      quizScores: {},
      assignmentScores: {},
      overallProgress: 0,
      certificateIssued: false,
      lastAccessed: new Date()
    };

    const updatedProgress = {
      ...studentProgress,
      [courseId]: newProgress
    };

    saveProgress(updatedProgress);
    toast.success('Successfully enrolled in course!');
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    if (!user) return;

    const currentProgress = studentProgress[courseId];
    if (!currentProgress) return;

    if (currentProgress.completedLessons.includes(lessonId)) return;

    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const updatedCompletedLessons = [...currentProgress.completedLessons, lessonId];
    
    // Check if module is complete
    const updatedCompletedModules = [...currentProgress.completedModules];
    course.modules.forEach(module => {
      const moduleLessons = module.lessons.map(l => l.id);
      const moduleComplete = moduleLessons.every(id => updatedCompletedLessons.includes(id));
      if (moduleComplete && !updatedCompletedModules.includes(module.id)) {
        updatedCompletedModules.push(module.id);
      }
    });

    // Calculate overall progress
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const overallProgress = Math.round((updatedCompletedLessons.length / totalLessons) * 100);

    const updatedProgress = {
      ...studentProgress,
      [courseId]: {
        ...currentProgress,
        completedLessons: updatedCompletedLessons,
        completedModules: updatedCompletedModules,
        overallProgress,
        certificateIssued: overallProgress === 100,
        certificateDate: overallProgress === 100 ? new Date() : currentProgress.certificateDate,
        lastAccessed: new Date()
      }
    };

    saveProgress(updatedProgress);
    toast.success('Lesson completed!');

    if (overallProgress === 100) {
      toast.success('🎉 Congratulations! You have completed the course and earned your certificate!');
    }
  };

  const submitQuizAttempt = (courseId: string, quizId: string, attempt: Omit<QuizAttempt, 'id'>) => {
    if (!user) return;

    const currentProgress = studentProgress[courseId];
    if (!currentProgress) return;

    const updatedProgress = {
      ...studentProgress,
      [courseId]: {
        ...currentProgress,
        quizScores: {
          ...currentProgress.quizScores,
          [quizId]: attempt.score
        },
        lastAccessed: new Date()
      }
    };

    saveProgress(updatedProgress);
    
    if (attempt.passed) {
      toast.success(`Quiz passed with ${attempt.score}% score!`);
    } else {
      toast.error(`Quiz failed. You scored ${attempt.score}%. Try again!`);
    }
  };

  const submitAssignment = (courseId: string, assignmentId: string, submission: Omit<AssignmentSubmission, 'id'>) => {
    if (!user) return;

    const currentProgress = studentProgress[courseId];
    if (!currentProgress) return;

    const updatedProgress = {
      ...studentProgress,
      [courseId]: {
        ...currentProgress,
        lastAccessed: new Date()
      }
    };

    saveProgress(updatedProgress);
    toast.success('Assignment submitted successfully!');
  };

  const getCourseProgress = (courseId: string): StudentProgress | null => {
    return studentProgress[courseId] || null;
  };

  const isLessonUnlocked = (courseId: string, lessonId: string): boolean => {
    const course = courses.find(c => c.id === courseId);
    const progress = studentProgress[courseId];
    
    if (!course || !progress) return false;

    // First lesson is always unlocked
    const allLessons = course.modules.flatMap(m => m.lessons).sort((a, b) => a.order - b.order);
    const currentLessonIndex = allLessons.findIndex(l => l.id === lessonId);
    
    if (currentLessonIndex === 0) return true;
    
    // Check if previous lesson is completed
    const previousLesson = allLessons[currentLessonIndex - 1];
    return progress.completedLessons.includes(previousLesson.id);
  };

  return (
    <CourseContext.Provider value={{
      courses,
      studentProgress,
      enrollInCourse,
      markLessonComplete,
      submitQuizAttempt,
      submitAssignment,
      getCourseProgress,
      isLessonUnlocked
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};