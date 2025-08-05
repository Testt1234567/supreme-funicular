import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AnnotatedImageProps } from '../types';

const AnnotatedImage: React.FC<AnnotatedImageProps> = ({
  imageUrl,
  annotations,
  selectedAnnotation,
  onAnnotationClick
}) => {
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (imageRef.current && containerRef.current) {
        const container = containerRef.current;
        
        setContainerDimensions({
          width: container.offsetWidth,
          height: container.offsetHeight
        });
      }
    };

    const img = imageRef.current;
    if (img) {
      if (img.complete) {
        updateDimensions();
      } else {
        img.onload = updateDimensions;
      }
    }

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imageUrl]);

  const calculatePosition = (x: number, y: number) => {
    if (!containerDimensions.width || !containerDimensions.height) {
      return { x: 0, y: 0 };
    }

    return {
      x: (x / 100) * containerDimensions.width,
      y: (y / 100) * containerDimensions.height
    };
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'usability':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'accessibility':
        return 'bg-green-500 hover:bg-green-600';
      case 'visualDesign':
        return 'bg-purple-500 hover:bg-purple-600';
      default:
        return 'bg-primary-500 hover:bg-primary-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'ring-red-500';
      case 'medium':
        return 'ring-yellow-500';
      case 'low':
        return 'ring-gray-500';
      default:
        return 'ring-primary-500';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
      style={{ minHeight: '400px' }}
    >
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Design to be audited"
        className="w-full h-auto max-w-full"
        style={{ display: 'block' }}
      />
      
      {/* Annotation Overlay */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {annotations.map((annotation) => {
            const position = calculatePosition(annotation.x, annotation.y);
            const isSelected = selectedAnnotation === annotation.id;
            
            return (
              <motion.div
                key={annotation.id}
                className={`
                  absolute w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer transition-all duration-200 z-10
                  ${getCategoryColor(annotation.category)}
                  ${isSelected ? `ring-4 ${getSeverityColor(annotation.severity)} scale-110` : 'hover:scale-105'}
                `}
                style={{
                  left: position.x - 16, // Half of width (32px / 2)
                  top: position.y - 16,  // Half of height (32px / 2)
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: isSelected ? 1.1 : 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.3,
                  delay: annotation.number * 0.1
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAnnotationClick(annotation.id)}
              >
                {annotation.number}
                
                {/* Tooltip */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-xs font-normal whitespace-nowrap shadow-lg z-20"
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {annotation.title}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</div>
        <div className="flex space-x-3">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Usability</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Accessibility</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-purple-500 rounded-full" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Visual</span>
          </div>
        </div>
      </div>

      {/* Severity Indicator */}
      {selectedAnnotation && (
        <motion.div
          className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {(() => {
            const annotation = annotations.find(a => a.id === selectedAnnotation);
            if (!annotation) return null;
            
            const severityConfig = {
              high: { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/40', label: 'High Priority' },
              medium: { color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/40', label: 'Medium Priority' },
              low: { color: 'text-gray-600', bg: 'bg-gray-100 dark:bg-gray-700', label: 'Low Priority' }
            };
            
            const config = severityConfig[annotation.severity];
            
            return (
              <div className={`${config.bg} px-2 py-1 rounded text-xs font-medium ${config.color}`}>
                {config.label}
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
};

export default AnnotatedImage;