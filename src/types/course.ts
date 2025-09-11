export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration: number; // in minutes
  materials: CourseMaterial[];
  assignment?: Assignment;
  quiz?: Quiz;
  completed: boolean;
  order: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  thumbnail: string;
  price: number;
  currency: string;
  modules: Module[];
  students: string[];
  createdAt: Date;
  updatedAt: Date;
  totalDuration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  jobGuarantee: boolean;
  certificateTemplate: string;
}

export interface CourseMaterial {
  id: string;
  type: 'pdf' | 'document' | 'link' | 'image' | 'video' | 'presentation';
  title: string;
  url: string;
  description?: string;
  fileSize?: string;
  downloadable?: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  dueDate?: Date;
  maxScore: number;
  submissionType: 'file' | 'text' | 'url';
  submissions: AssignmentSubmission[];
  resources?: CourseMaterial[];
}

export interface AssignmentSubmission {
  id: string;
  studentId: string;
  studentName: string;
  submissionDate: Date;
  content: string;
  fileUrl?: string;
  score?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'pending';
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'short-answer' | 'true-false';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  passingScore: number;
  attempts: QuizAttempt[];
  maxAttempts: number;
}

export interface QuizAttempt {
  id: string;
  studentId: string;
  studentName: string;
  startTime: Date;
  endTime?: Date;
  answers: Record<string, string | string[]>;
  score: number;
  passed: boolean;
  timeSpent: number;
}

export interface StudentProgress {
  studentId: string;
  courseId: string;
  completedLessons: string[];
  completedModules: string[];
  quizScores: Record<string, number>;
  assignmentScores: Record<string, number>;
  overallProgress: number;
  certificateIssued: boolean;
  certificateDate?: Date;
  lastAccessed: Date;
  studyTimeSpent: number; // in minutes
  averageQuizScore: number;
  assignmentsCompleted: number;
}

export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  issueDate: Date;
  certificateUrl: string;
  verificationCode: string;
}