import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, Eye, Palette, HelpCircle, CheckCircle } from 'lucide-react';
import type { ScoreDisplayProps } from '../types';

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ scores, overallScore }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100 dark:bg-green-900/40';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/40';
    return 'text-red-600 bg-red-100 dark:bg-red-900/40';
  };

  const getOverallScoreColor = (score: number) => {
    if (score >= 8) return 'from-green-500 to-green-600';
    if (score >= 6) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getScoreIcon = (category: string) => {
    switch (category) {
      case 'usability':
        return <Users className="w-5 h-5" />;
      case 'accessibility':
        return <Eye className="w-5 h-5" />;
      case 'visualDesign':
        return <Palette className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'usability':
        return 'Based on Nielsen Norman Group principles and user interaction patterns';
      case 'accessibility':
        return 'Evaluated against WCAG 2.1 guidelines for inclusive design';
      case 'visualDesign':
        return 'Assessed using Laws of UX and modern design principles';
      default:
        return '';
    }
  };

  const getScoreGrade = (score: number) => {
    if (score >= 9) return 'A+';
    if (score >= 8) return 'A';
    if (score >= 7) return 'B+';
    if (score >= 6) return 'B';
    if (score >= 5) return 'C+';
    if (score >= 4) return 'C';
    return 'D';
  };

  const scoreCategories = [
    {
      key: 'usability',
      title: 'Usability',
      score: scores.usability,
      icon: getScoreIcon('usability'),
      description: getCategoryDescription('usability')
    },
    {
      key: 'accessibility',
      title: 'Accessibility',
      score: scores.accessibility,
      icon: getScoreIcon('accessibility'),
      description: getCategoryDescription('accessibility')
    },
    {
      key: 'visualDesign',
      title: 'Visual Design',
      score: scores.visualDesign,
      icon: getScoreIcon('visualDesign'),
      description: getCategoryDescription('visualDesign')
    }
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          UX Score Breakdown
        </h3>
        <motion.button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HelpCircle className="w-4 h-4" />
          <span className="text-sm">Why this score?</span>
        </motion.button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Overall Score */}
        <div className="text-center">
          <motion.div
            className="relative inline-block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
          >
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getOverallScoreColor(overallScore)} flex items-center justify-center shadow-lg`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {overallScore.toFixed(1)}
                </div>
                <div className="text-white text-sm opacity-90">
                  {getScoreGrade(overallScore)}
                </div>
              </div>
            </div>
            <motion.div
              className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <TrendingUp className="w-5 h-5 text-primary-600" />
            </motion.div>
          </motion.div>
          
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
            Overall UX Score
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {overallScore >= 8 ? 'Excellent' : overallScore >= 6 ? 'Good' : 'Needs Improvement'}
          </p>
        </div>

        {/* Category Scores */}
        <div className="space-y-4">
          {scoreCategories.map((category, index) => (
            <motion.div
              key={category.key}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getScoreColor(category.score)}`}>
                  {category.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {category.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {getScoreGrade(category.score)} Grade
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-xl font-bold ${getScoreColor(category.score).split(' ')[0]}`}>
                  {category.score.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  / 10.0
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Score Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              How We Calculate Your Score
            </h4>
            
            <div className="space-y-4">
              {scoreCategories.map((category, index) => (
                <motion.div
                  key={category.key}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getScoreColor(category.score)} flex-shrink-0`}>
                      {category.icon}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                        {category.title} ({category.score.toFixed(1)}/10)
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <h5 className="font-medium text-primary-900 dark:text-primary-100 mb-2">
                Overall Score Calculation
              </h5>
              <p className="text-sm text-primary-800 dark:text-primary-200">
                Your overall score is a weighted average of all categories, with accessibility and usability 
                having slightly higher weights due to their critical impact on user experience. The algorithm 
                considers both the severity and frequency of issues found in each category.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScoreDisplay;