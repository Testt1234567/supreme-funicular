import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import UploadInterface from './components/UploadInterface';
import AuditViewer from './components/AuditViewer';
import { ThemeProvider } from './contexts/ThemeContext';
import type { AuditResult } from './types';

function App() {
  const [currentAudit, setCurrentAudit] = useState<AuditResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock audit result - in real implementation, this would call your AI service
    const mockAudit: AuditResult = {
      id: Date.now().toString(),
      fileName: file.name,
      imageUrl: URL.createObjectURL(file),
      overallScore: 7.2,
      scores: {
        usability: 8.1,
        accessibility: 6.4,
        visualDesign: 7.1
      },
      annotations: [
        {
          id: '1',
          x: 20,
          y: 15,
          number: 1,
          category: 'usability',
          title: 'Navigation Clarity',
          description: 'The navigation menu lacks clear visual hierarchy. Consider using different font weights or colors to distinguish primary from secondary actions.',
          severity: 'medium',
          suggestion: 'Add visual contrast between primary and secondary navigation items. Look at how Spotify uses subtle color differences in their sidebar.'
        },
        {
          id: '2',
          x: 60,
          y: 30,
          number: 2,
          category: 'accessibility',
          title: 'Color Contrast',
          description: 'The text contrast ratio is below WCAG AA standards (3.2:1). This makes it difficult for users with visual impairments to read.',
          severity: 'high',
          suggestion: 'Increase the contrast ratio to at least 4.5:1 for normal text. Tools like WebAIM can help you check compliance.'
        },
        {
          id: '3',
          x: 40,
          y: 60,
          number: 3,
          category: 'visualDesign',
          title: 'Button Sizing',
          description: 'CTA buttons are too small for mobile touch targets. Apple recommends minimum 44px tap targets.',
          severity: 'medium',
          suggestion: 'Increase button height to at least 44px. Reference Stripe\'s mobile design for well-sized interactive elements.'
        },
        {
          id: '4',
          x: 75,
          y: 45,
          number: 4,
          category: 'usability',
          title: 'Information Architecture',
          description: 'Too much information is presented at once, creating cognitive overload. Consider progressive disclosure.',
          severity: 'low',
          suggestion: 'Break complex forms into steps. Look at how Airbnb structures their booking flow for inspiration.'
        }
      ],
      feedback: {
        positive: [
          'Clean, modern aesthetic that follows current design trends',
          'Good use of whitespace and typography hierarchy',
          'Consistent color palette throughout the design'
        ],
        improvements: [
          'Enhance accessibility compliance for broader user base',
          'Improve mobile responsiveness and touch targets',
          'Add more visual feedback for user interactions',
          'Consider progressive disclosure for complex workflows'
        ]
      },
      timestamp: new Date()
    };
    
    setCurrentAudit(mockAudit);
    setIsAnalyzing(false);
  };

  const handleNewUpload = () => {
    setCurrentAudit(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {!currentAudit ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <UploadInterface 
                  onFileUpload={handleFileUpload}
                  isAnalyzing={isAnalyzing}
                />
              </motion.div>
            ) : (
              <motion.div
                key="audit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AuditViewer 
                  audit={currentAudit}
                  onNewUpload={handleNewUpload}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
