export interface Annotation {
  id: string;
  x: number; // Percentage position on image
  y: number; // Percentage position on image
  number: number;
  category: 'usability' | 'accessibility' | 'visualDesign';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  suggestion: string;
}

export interface AuditScores {
  usability: number;
  accessibility: number;
  visualDesign: number;
}

export interface AuditFeedback {
  positive: string[];
  improvements: string[];
}

export interface AuditResult {
  id: string;
  fileName: string;
  imageUrl: string;
  overallScore: number;
  scores: AuditScores;
  annotations: Annotation[];
  feedback: AuditFeedback;
  timestamp: Date;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface UploadInterfaceProps {
  onFileUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export interface AuditViewerProps {
  audit: AuditResult;
  onNewUpload: () => void;
}

export interface AnnotatedImageProps {
  imageUrl: string;
  annotations: Annotation[];
  selectedAnnotation: string | null;
  onAnnotationClick: (annotationId: string) => void;
}

export interface FeedbackListProps {
  annotations: Annotation[];
  selectedAnnotation: string | null;
  onAnnotationSelect: (annotationId: string) => void;
}

export interface ScoreDisplayProps {
  scores: AuditScores;
  overallScore: number;
}