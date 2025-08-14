# 🧠 code-contextify

**Transform your entire codebase into AI-ready context in seconds**

[![npm version](https://badge.fury.io/js/code-contextify.svg)](https://badge.fury.io/js/code-contextify)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org)
[![License](https://img.shields.io/npm/l/code-contextify)](LICENSE)

> *"Turn thousands of files into one perfect prompt for your AI assistant"*

---

## 🚀 Why code-contextify?

Fed up with copying and pasting files into ChatGPT? Struggling to give Claude the full picture of your project? **code-contextify** solves this by creating a single, comprehensive text file containing your entire project structure and content - perfectly formatted for AI consumption.

### Perfect For:
- 🤖 **LLM Prompting** - Give AI assistants complete project context
- 📚 **Documentation** - Generate instant project overviews
- 🔍 **Code Reviews** - Share full context with teammates
- 📊 **Project Analysis** - Understand complex codebases quickly
- 🎯 **Debugging** - Let AI analyze your entire codebase at once

---

## 🎯 Quick Start

```bash
# Install globally
npm install -g code-contextify

# Transform any project into AI context
code-contextify /path/to/your/project

# That's it! Your context file is ready 🎉
```

---

## 🛠️ Installation

### Prerequisites
- Node.js >= 14.0.0

### Install Options

```bash
# Global installation (recommended)
npm install -g code-contextify

# Or use npx without installing
npx code-contextify /path/to/project
```

---

## 🎮 Usage Guide

### Basic Usage
```bash
# Convert current directory
code-contextify .

# Convert specific directory
code-contextify /path/to/your/project

# Custom output filename
code-contextify . my-project-context.txt
```

### Advanced Filtering
```bash
# Exclude specific folders
code-contextify . --filter "node_modules,dist,build"

# Exclude files with specific patterns
code-contextify . --filter "test,__mocks__,*.spec.js"

# Complex filtering with paths
code-contextify . --filter "src/tests,docs,temp,*.log"
```

### Real-World Examples

#### 1. **Prepare for AI Code Review**
```bash
code-contextify . review-context.txt --filter "node_modules,dist,*.min.js"
```

#### 2. **Share Project Context with Team**
```bash
code-contextify /path/to/project team-brief.txt
```

#### 3. **Create Documentation Context**
```bash
code-contextify . docs-context.txt --filter "tests,__tests__,*.test.*"
```

#### 4. **Debug with AI Assistant**
```bash
code-contextify . debug-context.txt --filter "node_modules,*.log,temp"
```

---

## 📋 What's In The Output?

Your generated context file includes:

### 📊 Project Overview
```
Project Statistics:
Total Files: 42
Total Size: 1.25 MB

```

### 🌳 Smart Directory Tree
```
Folder Structure (Tree)
=====================
Legend: ✗ = Excluded
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   └── Footer.js
│   └── utils/
├── node_modules/ ✗
├── package-lock.json (123.45 KB) ✗
└── README.md (2.34 KB)
```

### 📄 File Contents
```
src/components/Header.js
------------------------
import React from 'react';
// ... actual file content
```

---

## 🧠 AI Prompting Tips

### Perfect Prompts to Use:
```
Here's the complete context of my project.
Please help me [your specific request]:

[Generated context content here]
```

### Common Use Cases:
- **"Explain this codebase to me"**
- **"Find potential bugs in this project"**
- **"Suggest improvements to this architecture"**
- **"Write documentation for this project"**
- **"Help me understand how these components work together"**

---

## ⚙️ How It Works

### Smart Filtering System
✅ **Automatically Excludes:**
- Binary files (images, executables, etc.)
- Configuration files (`package-lock.json`, `.env`)
- Common directories (`node_modules`, `.git`)
- Git-ignored files and patterns
- Media files (videos, audio, etc.)

✅ **Intelligently Includes:**
- Source code files
- Documentation
- Configuration files you actually need
- Text-based assets

### Technology Detection
Automatically identifies:
- JavaScript/TypeScript
- React/Vue/Angular
- Python
- And many more!

---

## 🎯 Pro Tips

### 1. **Optimize for Different AI Models**
```bash
# For models with smaller context windows
code-contextify . --filter "tests,docs,examples,*.md"

# For models with large context windows
code-contextify .  # Include everything!
```

### 2. **Create Project Snapshots**
```bash
# Timestamped context files
code-contextify . project_$(date +%Y%m%d_%H%M%S).txt
```

### 3. **Focus on Specific Areas**
```bash
# Only include source code
code-contextify . --filter "tests,docs,*.md,*.json,*.yml"

# Only include tests
code-contextify . tests-context.txt --filter "src,docs,*.md"
```

---

## 🛡️ Security & Privacy

- **Local Processing** - Your code never leaves your machine
- **Respects .gitignore** - Doesn't include ignored files
- **No Telemetry** - Zero data collection
- **Open Source** - Audit the code yourself

---

## 🤝 Contributing

Contributions welcome! Here's how to get started:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

### Areas Needing Help:
- 🌍 Language detection improvements
- 🎨 Better output formatting
- ⚡ Performance optimizations
- 📚 More examples and documentation
- 🧪 Test coverage

---

## 📄 License

This project is licensed under **MIT with Commons Clause** - see the [LICENSE](LICENSE) file for details.

**Commercial use requires permission.**

---

## 👨‍💻 Author

**Nidal Siddique Oritro**
- Website: [iam.ioritro.com](https://iam.ioritro.com)
- GitHub: [@ElvinEga](https://github.com/ElvinEga)

Built with ❤️ for developers working with AI

---

## 🆘 Support

Need help?

- 🐛 [Report an issue](https://github.com/ElvinEga/code-contextify/issues)
- 💬 Join discussions
- 📧 Contact the author

---

## 🌟 Show Your Support

If this tool saves you time:
- ⭐ Star this repository
- 🐦 Tweet about it
- 🤝 Recommend to fellow developers
- 💖 Sponsor the project

---

*"Turn your codebase into conversation - one context file at a time"*
