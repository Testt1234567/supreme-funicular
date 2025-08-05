import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileImage, Loader2, Star, Zap } from 'lucide-react';
import type { UploadInterfaceProps } from '../types';

const UploadInterface: React.FC<UploadInterfaceProps> = ({ onFileUpload, isAnalyzing }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const features = [
    {
      icon: <Star className="w-5 h-5" />,
      title: "Professional Analysis",
      description: "Get insights like teams at Apple, Google, and Spotify"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Instant Results",
      description: "Complete UX audit in seconds, not days"
    },
    {
      icon: <FileImage className="w-5 h-5" />,
      title: "Multiple Formats",
      description: "Supports PNG, JPG, and PDF uploads"
    }
  ];

  if (isAnalyzing) {
    return (
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card p-8 max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-primary-600" />
            </motion.div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Analyzing Your Design
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Our AI is evaluating usability, accessibility, and visual design principles...
          </p>
          <div className="mt-6">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-primary-600 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Upload Your Design for an
          <span className="text-primary-600"> Instant UX Audit</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Get professional-level feedback on usability, accessibility, and visual design. 
          It's like having a senior designer review your work in seconds! 🎬
        </p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div
          {...getRootProps()}
          className={`
            card p-12 text-center cursor-pointer transition-all duration-300 mb-8
            ${isDragActive 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 scale-[1.02]' 
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }
            border-2 border-dashed
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex justify-center mb-6">
            <motion.div
              className={`p-4 rounded-full ${
                isDragActive 
                  ? 'bg-primary-100 dark:bg-primary-900/40' 
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
              animate={{ scale: isDragActive ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Upload className={`w-8 h-8 ${
                isDragActive ? 'text-primary-600' : 'text-gray-600 dark:text-gray-400'
              }`} />
            </motion.div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {isDragActive ? 'Drop your file here!' : 'Drag & drop your design'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            or <span className="text-primary-600 font-medium">browse</span> to choose a file
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Supports PNG, JPG, PDF • Max 10MB
          </p>
        </div>
      </motion.div>

      {/* File Rejection Errors */}
      {fileRejections.length > 0 && (
        <motion.div 
          className="card p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="text-red-800 dark:text-red-400 font-medium mb-2">
            Upload Failed
          </h4>
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className="text-sm text-red-600 dark:text-red-400">
              <strong>{file.name}</strong>:
              <ul className="list-disc list-inside ml-2">
                {errors.map(e => (
                  <li key={e.code}>{e.message}</li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      )}

      {/* Features Grid */}
      <motion.div 
        className="grid md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="card p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/40 rounded-xl text-primary-600">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default UploadInterface;