
# Professional CV Builder

A modern, responsive web application for creating professional CVs and resumes. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Intuitive Step-by-Step Builder**: Guided process for creating professional CVs
- **Live Preview**: See your CV update in real-time as you make changes
- **PDF Export**: Download your CV as a high-quality PDF
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **ATS-Friendly**: Templates designed to pass Applicant Tracking Systems
- **Modern UI**: Clean, professional interface built with shadcn/ui components

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/cv-creator.git
cd cv-creator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚀 Deploy to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment:

1. **Fork this repository** to your GitHub account

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Set source to "GitHub Actions"

3. **Update the base path** in `vite.config.ts`:
   - Change `'/cv-creator/'` to `'/your-repository-name/'`

4. **Push to main branch**:
   - The GitHub Action will automatically build and deploy your site
   - Your site will be available at: `https://your-username.github.io/your-repository-name/`

### Manual Deployment:

```bash
npm run build
# Then upload the dist folder to your hosting provider
```

## 🔧 Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Beautiful icons
- **html2pdf.js** - PDF generation
- **Sonner** - Toast notifications

## 📱 Features Overview

The CV builder includes the following sections:
- **Personal Information** - Name, contact details, profile picture
- **Work Experience** - Professional experience with descriptions
- **Education** - Academic background and qualifications
- **Skills** - Technical and soft skills
- **References** - Professional references
- **Additional Information** - Languages, hobbies, notes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/your-username/cv-creator/issues) on GitHub.

---

**Made with ❤️ for job seekers everywhere**
