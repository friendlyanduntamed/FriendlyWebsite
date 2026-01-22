# Forest Tales - Wildlife Photography Portfolio

A magical, forest-themed personal website for a wildlife photographer, featuring immersive parallax effects, floating particles, and a narrative-driven design.

![Forest Tales Preview](./public/assets/images/hero/preview.jpg)

## ✨ Features

- **Immersive Visual Design** - Forest-themed aesthetic with parallax scrolling, floating particles, falling leaves, and light ray effects
- **Responsive Layout** - Fully responsive from mobile to desktop
- **Accessible** - Keyboard navigation, reduced motion support, semantic HTML
- **Performance Optimized** - Lazy loading, progressive enhancement
- **Modular Architecture** - Clean separation of concerns, maintainable code structure
- **Multi-page Static Site** - SEO-friendly, easy to deploy

## 📁 Project Structure

```
/FriendlyWebsite
├── public/
│   └── assets/
│       ├── images/
│       │   ├── hero/
│       │   ├── portfolio/
│       │   ├── blog/
│       │   └── about/
│       └── audio/
├── src/
│   ├── styles/
│   │   ├── variables.css    # Design tokens
│   │   ├── base.css         # Reset & typography
│   │   ├── layout.css       # Grid & flex utilities
│   │   ├── animations.css   # Keyframes & effects
│   │   ├── components.css   # UI components
│   │   └── pages.css        # Page-specific styles
│   └── scripts/
│       ├── main.js          # Entry point
│       ├── animations.js    # Parallax & particles
│       ├── sound.js         # Ambient audio
│       ├── modal.js         # Lightbox
│       └── components/
│           ├── navbar.js
│           └── footer.js
├── index.html               # Home
├── about.html               # About
├── portfolio.html           # Portfolio
├── blog.html                # Blog index
├── blog-post.html           # Blog post template
├── contact.html             # Contact
├── shop.html                # Coming soon
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd FriendlyWebsite

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The built files will be in the `dist/` directory.

## 🌐 Deployment

The site is static and can be deployed to any static hosting service.

### Netlify

```bash
# Using Netlify CLI
netlify deploy --prod --dir=dist
```

Or connect your Git repository to Netlify for automatic deployments.

### Vercel

```bash
# Using Vercel CLI
vercel --prod
```

### Cloudflare Pages

1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`

## 🎨 Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-forest-deep` | `#0d1f0d` | Primary background |
| `--color-moss` | `#2d4a2d` | Secondary backgrounds |
| `--color-gold` | `#c49a1a` | Accents & CTAs |
| `--color-mist` | `#e8f0e4` | Text on dark |

### Typography

- **Headings**: Cormorant Garamond (serif)
- **Body**: Outfit (sans-serif)

### Motion

All animations respect `prefers-reduced-motion`. Key animations:

- Parallax scrolling on hero layers
- Floating dust/pollen particles
- Wind-driven falling leaves
- Light ray pulse effects
- Scroll-triggered fade animations

## 📝 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero with forest entrance, featured work, blog preview |
| About | `/about.html` | Photographer's story as forest journey |
| Portfolio | `/portfolio.html` | Wildlife gallery with lightbox |
| Blog | `/blog.html` | Blog index with article cards |
| Blog Post | `/blog-post.html` | Full article template |
| Contact | `/contact.html` | Contact form with validation |
| Shop | `/shop.html` | Coming soon placeholder |

## 🔧 Customization

### Adding Images

Place images in `public/assets/images/` in the appropriate subdirectory:
- `hero/` - Homepage hero images
- `portfolio/` - Gallery images
- `blog/` - Blog post images
- `about/` - About page photos

### Adding Ambient Sound

Place an MP3 file at `public/assets/audio/forest-ambient.mp3`. The sound toggle will appear automatically.

### Changing Colors

Edit the color tokens in `src/styles/variables.css`:

```css
:root {
  --color-forest-deep: #0d1f0d;
  --color-gold: #c49a1a;
  /* ... */
}
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this for your own projects.

---

*Crafted with 🌲 by Forest Tales*
