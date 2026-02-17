# Phantom Assembly - Cloud & Operations Engineering

A modern, professional portfolio website for Phantom Assembly, showcasing cloud architecture, DevOps, and infrastructure engineering expertise.

## Features

✨ **Modern Design**
- Responsive dark theme with gradient accents
- Smooth animations and transitions
- Professional UI components

📱 **Sections**
- Hero section with CTA
- About section with founder profile
- Services showcase
- Portfolio/case studies
- Testimonials
- Cloud cost estimator (AI-powered)
- Contact form
- Social media links

🤖 **AI Integration**
- Google Gemini API for cloud cost estimation
- "Vibe visualizer" for concept visualization

🚀 **Tech Stack**
- React 19
- TypeScript
- Tailwind CSS
- Vite
- Google Generative AI API

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/phantom-assembly.git
cd phantom-assembly

# Install dependencies
npm install

# Create environment file
cat > .env.local << EOF
VITE_GEMINI_API_KEY=your_gemini_api_key_here
EOF

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`

## Building for Production

```bash
# Build the project
npm run build

# Preview production build
npm preview
```

## Deployment

### Option 1: Deploy to GitHub Pages

See [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) for detailed instructions.

Quick summary:
```bash
npm run build
git add .
git commit -m "Update code"
git push origin main
# Then set up gh-pages branch - see guide for details
```

### Option 2: Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Option 3: Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

## Project Structure

```
phantom-assembly/
├── components/          # React components
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── PortfolioSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── ContactSection.tsx
│   └── ...
├── public/
│   └── images/         # Local image assets
│       ├── logo.svg
│       ├── ranjith-profile.svg
│       └── project*.svg
├── utils/              # Utility functions
├── constants.ts        # Site configuration
├── App.tsx             # Main app component
└── index.tsx           # Entry point
```

## Configuration

Edit `constants.ts` to customize:
- Company name and logo
- Founder information
- Services offered
- Portfolio projects
- Client testimonials
- Social media links

## Environment Variables

Create `.env.local`:
```
VITE_GEMINI_API_KEY=your_actual_api_key
```

Get your API key from [Google AI Studio](https://aistudio.google.com)

## Local Images

All images are stored locally in `/public/images/`:
- `logo.svg` - Company logo
- `ranjith-profile.svg` - Founder profile picture
- `project1-4.svg` - Portfolio project images

## Features Guide

### Cloud Cost Estimator
- Uses Google Gemini API to generate cloud architecture suggestions
- Provides estimated monthly cost ranges
- AI-powered recommendations

### Portfolio Section
- Showcase of completed projects
- Filterable by technology tags
- Project descriptions and achievements

### Contact Form
- Direct messaging capability
- Email notifications (requires backend setup)
- Social media links

## Performance

- Optimized build size: ~130KB gzipped
- Lazy loading for images
- Tailwind CSS purging

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT - Feel free to use this template for your own portfolio

## Contact

- **Email**: ranjith@phantomassembly.com
- **LinkedIn**: [Ranjith V](https://www.linkedin.com/in/ranjith-operations-cloud-engineer)
- **GitHub**: [@ranjithv](https://github.com)

## Troubleshooting

### Images not loading locally?
- Check that `/public/images/` folder exists with SVG files
- Ensure Vite development server is running

### API key not working?
- Verify key is in `.env.local` file
- Restart dev server after changing environment
- Check API limits in Google AI Studio

### Build size too large?
- Consider using dynamic imports for heavy components
- Analyze bundle with `npm install -g vite-bundle-analyzer`

## Future Enhancements

- [ ] Blog section
- [ ] Case study PDF downloads
- [ ] Dark/Light mode toggle
- [ ] Multi-language support
- [ ] Email newsletter signup
- [ ] Client logos section
- [ ] Video testimonials

---

**Ready to deploy?** Check out [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) for step-by-step GitHub Pages deployment instructions!
