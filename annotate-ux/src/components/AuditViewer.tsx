import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { AuditViewerProps } from '../types';
import AnnotatedImage from './AnnotatedImage';
import FeedbackList from './FeedbackList';
import ScoreDisplay from './ScoreDisplay';

const AuditViewer: React.FC<AuditViewerProps> = ({ audit, onNewUpload }) => {
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
  const [userReaction, setUserReaction] = useState<'up' | 'down' | null>(null);

  const handleAnnotationClick = (annotationId: string) => {
    setSelectedAnnotation(selectedAnnotation === annotationId ? null : annotationId);
  };

  const handleReaction = (reaction: 'up' | 'down') => {
    setUserReaction(userReaction === reaction ? null : reaction);
  };

  const handleDownloadReport = () => {
    // In a real implementation, this would generate and download a PDF report
    const reportData = {
      fileName: audit.fileName,
      overallScore: audit.overallScore,
      scores: audit.scores,
      annotations: audit.annotations,
      feedback: audit.feedback,
      timestamp: audit.timestamp
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `ux-audit-${audit.fileName}-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row md:items-center justify-between mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            UX Audit Results
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Analysis of <span className="font-medium">{audit.fileName}</span>
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <motion.button
            onClick={handleDownloadReport}
            className="btn-secondary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </motion.button>
          
          <motion.button
            onClick={onNewUpload}
            className="btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Another</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Score Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <ScoreDisplay 
          scores={audit.scores} 
          overallScore={audit.overallScore} 
        />
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Annotated Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Annotated Design
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {audit.annotations.length} issues found
              </div>
            </div>
            
            <AnnotatedImage
              imageUrl={audit.imageUrl}
              annotations={audit.annotations}
              selectedAnnotation={selectedAnnotation}
              onAnnotationClick={handleAnnotationClick}
            />
          </div>
        </motion.div>

        {/* Feedback List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FeedbackList
            annotations={audit.annotations}
            selectedAnnotation={selectedAnnotation}
            onAnnotationSelect={handleAnnotationClick}
          />
        </motion.div>
      </div>

      {/* Overall Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Overall Assessment
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Positive Feedback */}
            <div>
              <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mb-3 flex items-center">
                <ThumbsUp className="w-5 h-5 mr-2" />
                What's Working Well
              </h4>
              <ul className="space-y-2">
                {audit.feedback.positive.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div>
              <h4 className="text-lg font-medium text-amber-600 dark:text-amber-400 mb-3 flex items-center">
                <ThumbsUp className="w-5 h-5 mr-2 rotate-180" />
                Areas for Improvement
              </h4>
              <ul className="space-y-2">
                {audit.feedback.improvements.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* User Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8"
      >
        <div className="card p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Was this audit helpful?
          </h3>
          <div className="flex justify-center space-x-4">
            <motion.button
              onClick={() => handleReaction('up')}
              className={`p-3 rounded-lg transition-colors duration-200 ${
                userReaction === 'up'
                  ? 'bg-green-100 dark:bg-green-900/40 text-green-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ThumbsUp className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              onClick={() => handleReaction('down')}
              className={`p-3 rounded-lg transition-colors duration-200 ${
                userReaction === 'down'
                  ? 'bg-red-100 dark:bg-red-900/40 text-red-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ThumbsDown className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuditViewer;