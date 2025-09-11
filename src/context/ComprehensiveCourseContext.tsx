import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course, StudentProgress, QuizAttempt, AssignmentSubmission } from '../types/course';
import { comprehensiveCourse } from '../data/comprehensiveCourseData';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface ComprehensiveCourseContextType {
  course: Course;
  studentProgress: StudentProgress | null;
  internshipStipend: number;
  monthsCompleted: number;
  certificationsEarned: string[];
  enrollInCourse: () => void;
  markLessonComplete: (lessonId: string) => void;
  submitQuizAttempt: (quizId: string, attempt: Omit<QuizAttempt, 'id'>) => void;
  submitAssignment: (assignmentId: string, submission: Omit<AssignmentSubmission, 'id'>) => void;
  isLessonUnlocked: (lessonId: string) => boolean;
  calculateStipend: () => number;
  generateCertificate: (moduleId: string) => void;
  submitCapstoneProject: (projectData: any) => void;
}

const ComprehensiveCourseContext = createContext<ComprehensiveCourseContextType | undefined>(undefined);

export const ComprehensiveCourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [course] = useState<Course>(comprehensiveCourse);
  const [studentProgress, setStudentProgress] = useState<StudentProgress | null>(null);
  const [internshipStipend, setInternshipStipend] = useState(0);
  const [monthsCompleted, setMonthsCompleted] = useState(0);
  const [certificationsEarned, setCertificationsEarned] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'student') {
      // Load student progress from localStorage
      const storedProgress = localStorage.getItem(`comprehensive_progress_${user.id}`);
      if (storedProgress) {
        const progress = JSON.parse(storedProgress);
        setStudentProgress(progress);
        calculateMonthsAndStipend(progress);
        
        // Load certifications
        const storedCertifications = localStorage.getItem(`certifications_${user.id}`);
        if (storedCertifications) {
          setCertificationsEarned(JSON.parse(storedCertifications));
        }
      } else {
        // Auto-enroll in comprehensive course
        enrollInCourse();
      }
    }
  }, [user]);

  const saveProgress = (progress: StudentProgress) => {
    if (user) {
      localStorage.setItem(`comprehensive_progress_${user.id}`, JSON.stringify(progress));
      setStudentProgress(progress);
      calculateMonthsAndStipend(progress);
    }
  };

  const saveCertifications = (certifications: string[]) => {
    if (user) {
      localStorage.setItem(`certifications_${user.id}`, JSON.stringify(certifications));
      setCertificationsEarned(certifications);
    }
  };

  const calculateMonthsAndStipend = (progress: StudentProgress) => {
    const completedModules = progress.completedModules.length;
    const months = Math.floor(completedModules / 2.5); // Approximately 2.5 modules per month
    setMonthsCompleted(months);
    
    // Stipend starts from 4th month
    if (months >= 4) {
      setInternshipStipend((months - 3) * 10000);
    } else {
      setInternshipStipend(0);
    }
  };

  const enrollInCourse = () => {
    if (!user) return;

    const newProgress: StudentProgress = {
      studentId: user.id,
      courseId: course.id,
      completedLessons: [],
      completedModules: [],
      quizScores: {},
      assignmentScores: {},
      overallProgress: 0,
      certificateIssued: false,
      lastAccessed: new Date(),
      studyTimeSpent: 0,
      averageQuizScore: 0,
      assignmentsCompleted: 0
    };

    saveProgress(newProgress);
    toast.success('Successfully enrolled in the comprehensive program!');
  };

  const markLessonComplete = (lessonId: string) => {
    if (!user || !studentProgress) return;

    if (studentProgress.completedLessons.includes(lessonId)) return;

    const updatedCompletedLessons = [...studentProgress.completedLessons, lessonId];
    
    // Check if module is complete
    const updatedCompletedModules = [...studentProgress.completedModules];
    course.modules.forEach(module => {
      const moduleLessons = module.lessons.map(l => l.id);
      const moduleComplete = moduleLessons.every(id => updatedCompletedLessons.includes(id));
      if (moduleComplete && !updatedCompletedModules.includes(module.id)) {
        updatedCompletedModules.push(module.id);
        // Generate module certificate
        generateCertificate(module.id);
      }
    });

    // Calculate overall progress
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const overallProgress = Math.round((updatedCompletedLessons.length / totalLessons) * 100);

    const updatedProgress: StudentProgress = {
      ...studentProgress,
      completedLessons: updatedCompletedLessons,
      completedModules: updatedCompletedModules,
      overallProgress,
      certificateIssued: overallProgress === 100,
      certificateDate: overallProgress === 100 ? new Date() : studentProgress.certificateDate,
      lastAccessed: new Date()
    };

    saveProgress(updatedProgress);
    toast.success('Lesson completed!');

    if (overallProgress === 100) {
      toast.success('🎉 Congratulations! You have completed the entire program and earned your diploma!');
    }
  };

  const submitQuizAttempt = (quizId: string, attempt: Omit<QuizAttempt, 'id'>) => {
    if (!user || !studentProgress) return;

    const updatedProgress: StudentProgress = {
      ...studentProgress,
      quizScores: {
        ...studentProgress.quizScores,
        [quizId]: attempt.score
      },
      lastAccessed: new Date()
    };

    saveProgress(updatedProgress);
    
    if (attempt.passed) {
      toast.success(`Quiz passed with ${attempt.score}% score! Certificate earned!`);
    } else {
      toast.error(`Quiz failed. You scored ${attempt.score}%. Try again!`);
    }
  };

  const submitAssignment = (assignmentId: string, submission: Omit<AssignmentSubmission, 'id'>) => {
    if (!user || !studentProgress) return;

    const updatedProgress: StudentProgress = {
      ...studentProgress,
      assignmentsCompleted: studentProgress.assignmentsCompleted + 1,
      lastAccessed: new Date()
    };

    saveProgress(updatedProgress);
    toast.success('Assignment submitted successfully!');
  };

  const isLessonUnlocked = (lessonId: string): boolean => {
    if (!studentProgress) return false;

    // First lesson is always unlocked
    const allLessons = course.modules.flatMap(m => m.lessons).sort((a, b) => a.order - b.order);
    const currentLessonIndex = allLessons.findIndex(l => l.id === lessonId);
    
    if (currentLessonIndex === 0) return true;
    
    // Check if previous lesson is completed
    const previousLesson = allLessons[currentLessonIndex - 1];
    return studentProgress.completedLessons.includes(previousLesson.id);
  };

  const calculateStipend = (): number => {
    return internshipStipend;
  };

  const generateCertificate = (moduleId: string) => {
    const module = course.modules.find(m => m.id === moduleId);
    if (module) {
      const newCertifications = [...certificationsEarned, module.title];
      saveCertifications(newCertifications);
      toast.success(`🏆 Certificate earned for: ${module.title}`);
    }
  };

  const submitCapstoneProject = (projectData: any) => {
    if (!user || !studentProgress) return;

    // Mark capstone as completed
    const updatedProgress: StudentProgress = {
      ...studentProgress,
      certificateIssued: true,
      certificateDate: new Date(),
      lastAccessed: new Date()
    };

    saveProgress(updatedProgress);
    toast.success('🎓 Capstone project submitted! Diploma certificate will be issued.');
  };

  return (
    <ComprehensiveCourseContext.Provider value={{
      course,
      studentProgress,
      internshipStipend,
      monthsCompleted,
      certificationsEarned,
      enrollInCourse,
      markLessonComplete,
      submitQuizAttempt,
      submitAssignment,
      isLessonUnlocked,
      calculateStipend,
      generateCertificate,
      submitCapstoneProject
    }}>
      {children}
    </ComprehensiveCourseContext.Provider>
  );
};

export const useComprehensiveCourse = () => {
  const context = useContext(ComprehensiveCourseContext);
  if (context === undefined) {
    throw new error('useComprehensiveCourse must be used within a ComprehensiveCourseProvider');
  }
  return context;
};