# IconSphere - Modern VS Code Icon Theme

🌟 **IconSphere** is a modern, customizable VS Code icon theme with three distinct styles: **Dark**, **Colorful**, and **Animated**. Features clean folder management without expand/collapse arrows for a minimalist coding experience.



## ✨ Features

- 🎯 **Clean Design**: No folder expand/collapse arrows for minimal distraction
- 🎨 **Multiple Variants**: Dark, Colorful, and Animated themes
- 📁 **Enhanced Folders**: Prominent, attractive folder icons
- ⚡ **Optimized Performance**: Lightweight and fast loading
- 🛠 **Highly Customizable**: Easy to modify and extend

## 🎨 Theme Variants

### 1. IconSphere Dark (`dark-icons`)
- Monochrome/minimal style with light colors
- Optimized for dark backgrounds  
- Clean and professional appearance
- Perfect for focus-intensive coding sessions

### 2. IconSphere Colorful (`colorful-icons`)
- Vibrant, colorful icons
- Each file type has its own optimized color
- Enhanced visual file recognition
- Modern Material Design inspired palette

### 3. IconSphere Animated (`animated-icons`)
- Colorful icons with subtle CSS animations
- Eye-friendly pulse, bounce, and float effects
- Adds life to your workspace without distraction
- Smart animation assignment based on file types

## 🚀 Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "IconSphere"
4. Click Install

### Manual Installation
1. Download the `.vsix` file from [releases](https://github.com/Khushdil380/IconSphere/releases)
2. Run: `code --install-extension iconsphere-1.0.0.vsix`

## 🎯 Usage

1. **Activate IconSphere**:
   - Open Command Palette (`Ctrl+Shift+P`)
   - Type: `Preferences: File Icon Theme`
   - Choose: "IconSphere Dark", "IconSphere Colorful", or "IconSphere Animated"

2. **Configure Settings** (Optional):
   ```json
   {
     "iconsphere.hidesExplorerArrows": true
   }
   ```

## 📦 Project Structure

```
IconSphere/
├── package.json              # Extension manifest with 3 theme variants
├── scripts/                  # Theme generation scripts
│   ├── generate-dark.js      # Dark theme generator
│   ├── generate-colorful.js  # Colorful theme generator  
│   ├── generate-animated.js  # Animated theme generator
│   ├── generate-all.js       # Build all themes
│   └── utils.js              # Core utilities and mappings
├── icons/                    # 1,111+ high-quality SVG icons
├── themes/                   # Generated theme folders
│   ├── dark/                 # IconSphere Dark theme
│   ├── colorful/             # IconSphere Colorful theme
│   └── animated/             # IconSphere Animated theme
├── src/                      # Extension source code
└── styles/                   # CSS for arrow hiding
```

## 🛠 Development

### Prerequisites
```bash
git clone https://github.com/Khushdil380/IconSphere.git
cd IconSphere
npm install
```

### Scripts
- `npm run generate` - Generate all theme variants
- `npm run generate:dark` - Generate only IconSphere Dark theme
- `npm run generate:colorful` - Generate only IconSphere Colorful theme  
- `npm run generate:animated` - Generate only IconSphere Animated theme
- `npm run build` - Build extension for distribution
- `npm test` - Run tests

### Adding New Icons
1. Add base SVG to `icons/` folder
2. Run `npm run generate` to create all variants
3. Update file extension mappings in `scripts/utils.js` if needed
4. Test in VS Code Extension Development Host (`F5`)

### Creating Custom Themes
1. Create a new generator script in `scripts/`
2. Add theme configuration to `package.json`
3. Update `generate-all.js` to include your theme

## 🌟 Key Features

- **🎯 Modular Architecture**: Change base icons once, generate all variants automatically
- **🎨 1,111+ Icons**: Comprehensive collection covering all major file types and frameworks
- **⚡ High Performance**: Optimized SVGs with smart caching and minimal bundle size
- **🔧 Highly Customizable**: Easy to modify colors, animations, and folder mappings
- **📈 Extensible**: Simple architecture for adding new themes and icon variants
- **🎪 Framework Support**: Icons for React, Vue, Angular, Node.js, Python, and 100+ more

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-icons`)
3. Add your icons to the `icons/` folder
4. Run `npm run generate` to test all themes
5. Commit your changes (`git commit -m 'Add amazing new icons'`)
6. Push to the branch (`git push origin feature/amazing-icons`)
7. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Inspired by Material Design principles
- Built for the VS Code community
- Special thanks to all contributors

---

**Made with ❤️ by [Khushdil](https://github.com/Khushdil380)**

⭐ **Star this repo if IconSphere made your coding experience better!**

## 🎪 Icon Coverage

Complete support for:
- Programming languages (JS, TS, Python, Rust, Go, etc.)
- Frameworks (React, Vue, Angular, Next.js, etc.)
- File types (JSON, YAML, MD, CSS, HTML, etc.)
- Folders (src, components, tests, docs, etc.)
- Tools & configs (Docker, Git, ESLint, etc.)

## 🔧 Customization

Edit the generation scripts to:
- Change color schemes
- Add new file type mappings
- Modify animation styles
- Create new theme variants
