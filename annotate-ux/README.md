# AnnotateUX

**Professional UX Audits, Instantly** 🎨✨

AnnotateUX is a web-based tool designed for Product Managers, Designers, Engineers, and AI Entrepreneurs to upload UI designs and receive professional-level UX audits. The tool uses UX principles, accessibility guidelines, and top-tier product design heuristics to generate annotated feedback and actionable insights.

## 🚀 Features

- **Instant UX Analysis**: Upload a design and get professional feedback in seconds
- **Annotated Visual Feedback**: Numbered highlights over the uploaded UI image
- **Comprehensive Scoring**: 
  - Usability (Nielsen Norman Group principles)
  - Accessibility (WCAG 2.1 guidelines) 
  - Visual Design (Laws of UX)
- **Interactive Annotations**: Click on numbered points for detailed explanations
- **Dark Mode Support**: Seamless theme switching
- **Responsive Design**: Works beautifully on all devices
- **Professional Insights**: Actionable suggestions with design inspiration references

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: TailwindCSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **File Upload**: React Dropzone with validation
- **Icons**: Lucide React
- **Build Tool**: Vite for fast development

## 🎯 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd annotate-ux
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # App header with theme toggle
│   ├── UploadInterface.tsx  # Drag & drop file upload
│   ├── AuditViewer.tsx     # Main audit results view
│   ├── AnnotatedImage.tsx  # Image with overlay annotations
│   ├── FeedbackList.tsx    # Expandable feedback list
│   └── ScoreDisplay.tsx    # UX score breakdown
├── contexts/           # React contexts
│   └── ThemeContext.tsx    # Dark/light theme management
├── types.ts           # TypeScript type definitions
├── App.tsx           # Main application component
└── main.tsx         # Application entry point
```

## 🎨 Design Philosophy

AnnotateUX follows a clean, modern aesthetic inspired by industry leaders:

- **Visual Style**: Stripe, Vercel, Airbnb design language
- **Voice & Tone**: Friendly, quirky, informal (like Pablo Stanley)
- **Color Scheme**: Professional blue primary with comprehensive dark mode
- **Typography**: Inter font family for excellent readability
- **Animations**: Subtle, purposeful micro-interactions

## 🔧 Customization

### Theme Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#3b82f6',
    600: '#2563eb',
    // ... more shades
  }
}
```

### Mock Data

The current implementation uses mock audit data. To integrate with a real AI service:

1. Replace the mock data in `App.tsx` 
2. Implement your API calls in the `handleFileUpload` function
3. Update the `AuditResult` type as needed

## 📊 Audit Categories

### Usability (Nielsen Norman Group)
- Navigation clarity and hierarchy
- User flow and task completion
- Error prevention and recovery
- Consistency and standards

### Accessibility (WCAG 2.1)
- Color contrast ratios
- Touch target sizes  
- Alt text and labels
- Keyboard navigation

### Visual Design (Laws of UX)
- Visual hierarchy and typography
- Color theory and palette
- Spacing and layout principles
- Brand consistency

## 🎬 Example Annotations

The tool provides contextual feedback like:

> **Navigation Clarity** - "The navigation menu lacks clear visual hierarchy. Consider using different font weights or colors to distinguish primary from secondary actions. Look at how Spotify uses subtle color differences in their sidebar."

> **Color Contrast** - "The text contrast ratio is below WCAG AA standards (3.2:1). Increase the contrast ratio to at least 4.5:1 for normal text."

## 🚀 Future Enhancements

- [ ] Multi-screen prototype audit
- [ ] Brand consistency checker  
- [ ] Accessibility simulation tools
- [ ] PDF report export
- [ ] Figma/Sketch plugins
- [ ] Real AI integration
- [ ] Collaboration features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Hitesh Lakhyani** - Product Owner & Developer

---

Made with ❤️ for the design community. Get professional UX feedback in seconds, not days!
