# Dr. Masrur Ahmed - Personal Portfolio Website

A modern, professional portfolio website for Dr. Masrur Ahmed, showcasing research achievements, publications, and professional experience. The entire website content is driven by a single JSON file for easy updates.

## 🎯 Features

- **JSON-Driven Content**: All personal information, experience, publications, and skills are stored in a single JSON file
- **Easy Updates**: Simply edit the JSON file to update any information on the website - no code changes needed
- **Research Metrics**: Display citations, h-index, and i10-index with visual emphasis
- **Searchable Publications**: Filter through publications by title, author, journal, or year
- **Professional Timeline**: Visual timeline of work experience and education
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Copy Citations**: One-click citation copying for publications

## 📝 How to Update Your Information

All website content is stored in `/src/data/profile.json`. Simply edit this file to update your information:

### Personal Information
```json
"personal": {
  "name": "Your Name",
  "title": "PhD",
  "tagline": "Your Professional Title",
  "bio": "Your professional bio...",
  "contact": {
    "phone": "+XX XXX XXX XXX",
    "email": "your@email.com",
    "workEmail": "work@email.com",
    "linkedin": "linkedin.com/in/yourprofile"
  }
}
```

### Research Metrics
```json
"research": {
  "orcid": "0000-0000-0000-0000",
  "googleScholar": "https://scholar.google.com/...",
  "metrics": {
    "citations": 1234,
    "hIndex": 20,
    "i10Index": 30
  }
}
```

### Adding Education
```json
"education": [
  {
    "degree": "PhD in Your Field",
    "institution": "University Name",
    "period": "2019 – 2022",
    "thesis": "Your thesis title"
  }
]
```

### Adding Work Experience
```json
"experience": [
  {
    "title": "Your Job Title",
    "organization": "Organization Name",
    "period": "JAN/2024 – to date",
    "description": "Brief description of your role",
    "highlights": [
      "Key achievement 1",
      "Key achievement 2"
    ]
  }
]
```

### Adding Publications
```json
"publications": [
  {
    "title": "Publication Title",
    "authors": "Author Names",
    "year": 2024,
    "journal": "Journal Name",
    "volume": "XX",
    "pages": "XXX-XXX"
  }
]
```

### Updating Skills
```json
"skills": {
  "programming": ["Python", "R", "SQL"],
  "frameworks": ["TensorFlow", "PyTorch"],
  "tools": ["Git", "AWS", "Docker"],
  "languages": ["English", "Spanish"]
}
```

### Adding Awards
```json
"awards": [
  "Award Name 1",
  "Award Name 2"
]
```

## 🚀 Quick Start

1. Edit `/src/data/profile.json` with your information
2. Save the file
3. Refresh the website to see your changes

## 💡 Tips

- **Keep JSON Valid**: Use a JSON validator (like jsonlint.com) to check your JSON is valid before saving
- **Dates**: Use consistent date formats (e.g., "JAN/2024" or "2024-01-15")
- **Line Breaks**: Use `\n` in text fields if you need line breaks
- **Special Characters**: Escape quotes with `\"` inside text fields
- **Empty Arrays**: If you don't have items for a section, use an empty array `[]`
- **Optional Fields**: Leave fields as empty strings `""` if not applicable

## 🎨 Design Features

- **Professional Color Scheme**: Deep academic blue with warm amber accents
- **Typography**: Crimson Pro for headings, Inter for body text
- **Smooth Animations**: Subtle transitions and hover effects
- **Card-Based Layout**: Clean, organized information presentation
- **Search Functionality**: Quickly find specific publications
- **Mobile-Optimized**: Fully responsive design for all devices

## 📂 Project Structure

```
src/
├── data/
│   └── profile.json          # Your data - edit this file!
├── components/
│   ├── Hero.tsx              # Header with name and contact
│   ├── ResearchHighlights.tsx # Research metrics and areas
│   ├── Education.tsx         # Education timeline
│   ├── Experience.tsx        # Work experience timeline
│   ├── Skills.tsx            # Technical skills
│   ├── Publications.tsx      # Searchable publications list
│   └── Awards.tsx            # Honours and awards
├── App.tsx                   # Main application
└── index.css                 # Theme and styling
```

## 🔧 Advanced Customization

If you want to customize colors or fonts, edit `/src/index.css`:

### Change Colors
```css
:root {
  --primary: oklch(0.35 0.08 250);  /* Main brand color */
  --accent: oklch(0.68 0.15 65);    /* Highlight color */
  /* ... other colors */
}
```

### Change Fonts
Update the Google Fonts link in `/index.html` and then update the CSS variables:
```css
--font-heading: 'Your Heading Font', serif;
--font-body: 'Your Body Font', sans-serif;
```

---

Built with React, TypeScript, Tailwind CSS, and shadcn/ui components.
