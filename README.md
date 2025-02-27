# Git Quiz

An interactive quiz application that tests your knowledge of Git through randomly selected questions from a GitHub repository.

![Quiz Question](https://github.com/user-attachments/assets/94d13aef-b92d-4aad-b901-5a77fdb7c644)

![Quiz Results](https://github.com/user-attachments/assets/198b0a8b-7d30-4943-91e6-2ea325db6923)

## 🚀 Features

- **Real Questions**: Fetches actual Git quiz questions from LinkedIn skill assessments
- **Random Selection**: Presents 8 randomly selected questions for a unique experience each time
- **Interactive UI**: Clean, user-friendly interface with one question at a time
- **Immediate Feedback**: Shows correct/incorrect answers with explanations
- **Progress Tracking**: Displays current question number and running score
- **Results Summary**: Provides final score with personalized feedback
- **Responsive Design**: Works on all devices from mobile to desktop

## 🛠️ Technologies

- **React**: Frontend library for building the user interface
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For responsive and attractive styling
- **Lucide React**: For beautiful, consistent icons
- **Vite**: Fast, modern frontend build tool

## 📋 How It Works

1. The app fetches raw markdown content from the [LinkedIn Skill Assessments Quizzes](https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes) repository
2. It parses the markdown to extract questions, options, correct answers, and explanations
3. A random subset of questions is selected for each quiz session
4. Questions are presented one at a time with multiple-choice options
5. After answering, the correct answer is highlighted and an explanation is shown when available
6. After completing all questions, a summary of results is displayed

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/git-quiz-app.git
   cd git-quiz-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🧪 Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
