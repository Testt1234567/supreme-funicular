import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, Info, CheckCircle, Lightbulb } from 'lucide-react';
import type { FeedbackListProps } from '../types';

const FeedbackList: React.FC<FeedbackListProps> = ({
  annotations,
  selectedAnnotation,
  onAnnotationSelect
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (annotationId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(annotationId)) {
      newExpanded.delete(annotationId);
    } else {
      newExpanded.add(annotationId);
    }
    setExpandedItems(newExpanded);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'usability':
        return <Info className="w-4 h-4" />;
      case 'accessibility':
        return <CheckCircle className="w-4 h-4" />;
      case 'visualDesign':
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'usability':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/40';
      case 'accessibility':
        return 'text-green-600 bg-green-100 dark:bg-green-900/40';
      case 'visualDesign':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/40';
      default:
        return 'text-primary-600 bg-primary-100 dark:bg-primary-900/40';
    }
  };

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'high':
        return {
          icon: <AlertTriangle className="w-4 h-4" />,
          color: 'text-red-600',
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800'
        };
      case 'medium':
        return {
          icon: <AlertTriangle className="w-4 h-4" />,
          color: 'text-yellow-600',
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-800'
        };
      case 'low':
        return {
          icon: <Info className="w-4 h-4" />,
          color: 'text-gray-600',
          bg: 'bg-gray-50 dark:bg-gray-800',
          border: 'border-gray-200 dark:border-gray-700'
        };
      default:
        return {
          icon: <Info className="w-4 h-4" />,
          color: 'text-gray-600',
          bg: 'bg-gray-50 dark:bg-gray-800',
          border: 'border-gray-200 dark:border-gray-700'
        };
    }
  };

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'usability':
        return 'Usability';
      case 'accessibility':
        return 'Accessibility';
      case 'visualDesign':
        return 'Visual Design';
      default:
        return category;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Detailed Feedback
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Click annotations to highlight
        </div>
      </div>

      <div className="space-y-3">
        {annotations.map((annotation, index) => {
          const isSelected = selectedAnnotation === annotation.id;
          const isExpanded = expandedItems.has(annotation.id);
          const severityConfig = getSeverityConfig(annotation.severity);

          return (
            <motion.div
              key={annotation.id}
              className={`
                card p-4 cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                  : 'hover:shadow-md'
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => onAnnotationSelect(annotation.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {/* Number Badge */}
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0
                    ${isSelected ? 'bg-primary-600' : getCategoryColor(annotation.category).replace('text-', 'bg-').replace('bg-', 'bg-').split(' ')[0]}
                  `}>
                    {annotation.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Title and Category */}
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {annotation.title}
                      </h4>
                      <div className={`
                        px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1
                        ${getCategoryColor(annotation.category)}
                      `}>
                        {getCategoryIcon(annotation.category)}
                        <span>{getCategoryDisplayName(annotation.category)}</span>
                      </div>
                    </div>

                    {/* Severity and Description Preview */}
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`
                        px-2 py-1 rounded flex items-center space-x-1 text-xs font-medium
                        ${severityConfig.color} ${severityConfig.bg}
                      `}>
                        {severityConfig.icon}
                        <span className="capitalize">{annotation.severity} Priority</span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {annotation.description}
                    </p>
                  </div>
                </div>

                {/* Expand Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpanded(annotation.id);
                  }}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                  >
                    {/* Full Description */}
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Issue Description
                      </h5>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {annotation.description}
                      </p>
                    </div>

                    {/* Suggestion */}
                    <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                        Suggestion
                      </h5>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {annotation.suggestion}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 mt-4">
                      <button className="text-xs bg-primary-100 hover:bg-primary-200 dark:bg-primary-900/40 dark:hover:bg-primary-900/60 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full transition-colors duration-200">
                        Learn More
                      </button>
                      <button className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full transition-colors duration-200">
                        Mark as Fixed
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FeedbackList;