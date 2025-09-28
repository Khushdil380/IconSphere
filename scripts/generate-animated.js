const path = require('path');
const { readSvg, writeSvg, replaceColors, addAnimations, getSvgFiles, createIconThemeJson } = require('./utils');

function getRandomAnimationType() {
  const animationTypes = ['breathing', 'pulse', 'bounce', 'float', 'fade'];
  return animationTypes[Math.floor(Math.random() * animationTypes.length)];
}

function generateAnimatedTheme() {
  console.log('✨ Generating Animated Theme...');
  
  const iconsDir = path.resolve(__dirname, '../icons');
  const outputDir = path.resolve(__dirname, '../themes/animated/icons');
  const svgFiles = getSvgFiles(iconsDir);
  
  const iconDefinitions = {};
  
  svgFiles.forEach(file => {
    const inputPath = path.join(iconsDir, file);
    const outputPath = path.join(outputDir, file);
    const iconName = path.parse(file).name;
    
    console.log(`  Processing: ${file}`);
    
    // For animated theme, use the original colorful base icons and add animations
    const svgContent = readSvg(inputPath);
    
    // Choose animation type based on icon type
    let animationType;
    if (file.includes('folder')) {
      animationType = 'breathing'; // Folders breathe gently
    } else if (file.includes('javascript') || file.includes('js')) {
      animationType = 'pulse'; // JS files pulse
    } else if (file.includes('typescript') || file.includes('ts')) {
      animationType = 'bounce'; // TS files bounce slightly
    } else if (file.includes('react') || file.includes('vue') || file.includes('angular')) {
      animationType = 'float'; // Framework files float
    } else if (file.includes('css') || file.includes('sass') || file.includes('stylus')) {
      animationType = 'fade'; // Style files fade in/out
    } else if (file.includes('json') || file.includes('yaml') || file.includes('xml')) {
      animationType = 'pulse'; // Data files pulse
    } else {
      animationType = getRandomAnimationType(); // Others get random animation
    }
    
    // Add animations to the base colorful icons
    const animatedSvg = addAnimations(svgContent, animationType);
    
    writeSvg(outputPath, animatedSvg);
    
    iconDefinitions[iconName] = {
      iconPath: `./icons/${file}`
    };
  });
  
  // Create theme JSON
  const themeJson = createIconThemeJson('animated', iconDefinitions);
  const themeJsonPath = path.resolve(__dirname, '../themes/animated/animated-icon-theme.json');
  
  require('fs').writeFileSync(themeJsonPath, themeJson, 'utf8');
  
  console.log(`✅ Animated theme generated with ${svgFiles.length} icons`);
  console.log(`   Icons: ${outputDir}`);
  console.log(`   Theme: ${themeJsonPath}`);
}

if (require.main === module) {
  generateAnimatedTheme();
}

module.exports = { generateAnimatedTheme };