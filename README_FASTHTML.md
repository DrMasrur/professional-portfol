# Academic Research Dashboard - FastHTML Version

A lightweight, ultra-fast Python-based dashboard for **A Masrur Ahmed**'s research profile. Built with [FastHTML](https://fastht.ml) - a modern, minimal Python web framework.

## ✨ Features

- **100% Free & Open Source** - No licensing costs, no subscription fees
- **Ultra-Lightweight** - Minimal dependencies, fast loading times
- **Pure Python** - No JavaScript/TypeScript required
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean, professional academic dashboard design
- **All Data Included**:
  - Research metrics (citations, h-index, i10-index)
  - Research areas
  - Publications list
  - Professional experience
  - Education history
  - Skills & expertise
  - Contact information

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation

1. **Install dependencies:**
   ```bash
   pip install python-fasthtml python-dotenv
   ```

2. **Run the dashboard:**
   ```bash
   python dashboard.py
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5001`

## 📁 Project Structure

```
/workspace/
├── dashboard.py          # Main FastHTML application
├── README_FASTHTML.md    # This file
└── src/
    └── data/
        └── profile.json  # Your profile data (reused from original dashboard)
```

## 🎨 Customization

### Modify Profile Data
Edit `src/data/profile.json` to update:
- Personal information
- Research metrics
- Publications
- Experience
- Education
- Skills

### Styling
Modify the CSS in the `Style()` section of `dashboard.py`:
- Color scheme (CSS variables)
- Layout spacing
- Typography
- Responsive breakpoints

## 🔧 Configuration

The dashboard uses these default settings:
- **Port**: 5001
- **Hot Reload**: Enabled (auto-refreshes on code changes)
- **Theme**: Light mode with blue/purple gradient

## 🌐 Deployment Options

### Local Development
```bash
python dashboard.py
```

### Production Server (Gunicorn)
```bash
pip install gunicorn
gunicorn dashboard:app -w 4 -b 0.0.0.0:5001
```

### Free Hosting Options

1. **Render.com** (Free tier)
   - Connect your GitHub repo
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `gunicorn dashboard:app`

2. **Railway.app** (Free tier with limits)
   - Deploy from GitHub
   - Auto-detects Python app

3. **Hugging Face Spaces** (Free)
   - Create a new Space
   - Upload files
   - Configure as Gradio/Static (works with FastHTML)

## 📊 Comparison with React Dashboard

| Feature | React Dashboard | FastHTML Dashboard |
|---------|----------------|-------------------|
| Bundle Size | ~500KB+ | ~50KB |
| Dependencies | 100+ npm packages | 2 Python packages |
| Build Step | Required (Vite/Webpack) | None |
| Hot Reload | Yes | Yes |
| Mobile Responsive | Yes | Yes |
| Learning Curve | Steep (JS/TS/React) | Gentle (Python only) |
| Server Required | Static hosting | Python server |

## 🛠️ Troubleshooting

### Port already in use
```bash
# Find and kill process on port 5001
lsof -ti:5001 | xargs kill -9
```

### Module not found
```bash
pip install --upgrade python-fasthtml
```

### JSON data not loading
Ensure `profile.json` is valid JSON:
```bash
python -m json.tool src/data/profile.json > /dev/null
```

## 📝 License

This project is open source and available under the same license as the original dashboard.

## 🙏 Credits

- **Original Dashboard**: React/TypeScript version
- **FastHTML Framework**: [Answer.ai](https://fastht.ml)
- **Profile Data**: A Masrur Ahmed's academic profile

---

**Built with ❤️ using FastHTML** - The fastest way to create web apps in Python!
