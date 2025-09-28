const path = require('path');
const { readSvg, writeSvg, replaceColors, getSvgFiles, createIconThemeJson } = require('./utils');

function convertToDarkTheme(svgContent) {
  // Convert any colored SVG to a monochrome dark theme version
  let darkSvg = svgContent;
  
  // Replace all fill colors with dark theme colors
  darkSvg = darkSvg.replace(/fill="[^"]*"/g, 'fill="#888888"');
  darkSvg = darkSvg.replace(/fill='[^']*'/g, "fill='#888888'");
  
  // Replace stroke colors
  darkSvg = darkSvg.replace(/stroke="[^"]*"/g, 'stroke="#aaaaaa"');
  darkSvg = darkSvg.replace(/stroke='[^']*'/g, "stroke='#aaaaaa'");
  
  // Handle special cases - make text/foreground elements lighter
  darkSvg = darkSvg.replace(/fill="#888888"/g, 'fill="#cccccc"');
  
  // Handle currentColor
  darkSvg = darkSvg.replace(/currentColor/g, '#cccccc');
  
  // Make sure backgrounds are darker than foregrounds
  darkSvg = darkSvg.replace(/<rect[^>]*fill="#cccccc"[^>]*>/g, (match) => {
    return match.replace('fill="#cccccc"', 'fill="#666666"');
  });
  
  return darkSvg;
}

function generateDarkTheme() {
  console.log('🌙 Generating Dark Theme...');
  
  const iconsDir = path.resolve(__dirname, '../icons');
  const outputDir = path.resolve(__dirname, '../themes/dark/icons');
  const svgFiles = getSvgFiles(iconsDir);
  
  const iconDefinitions = {};
  
  svgFiles.forEach(file => {
    const inputPath = path.join(iconsDir, file);
    const outputPath = path.join(outputDir, file);
    const iconName = path.parse(file).name;
    
    console.log(`  Processing: ${file}`);
    
    const svgContent = readSvg(inputPath);
    const darkSvg = convertToDarkTheme(svgContent);
    
    writeSvg(outputPath, darkSvg);
    
    iconDefinitions[iconName] = {
      iconPath: `./icons/${file}`
    };
  });
  
  // Create theme JSON
  const themeJson = createIconThemeJson('dark', iconDefinitions);
  const themeJsonPath = path.resolve(__dirname, '../themes/dark/dark-icon-theme.json');
  
  require('fs').writeFileSync(themeJsonPath, themeJson, 'utf8');
  
  console.log(`✅ Dark theme generated with ${svgFiles.length} icons`);
  console.log(`   Icons: ${outputDir}`);
  console.log(`   Theme: ${themeJsonPath}`);
}

if (require.main === module) {
  generateDarkTheme();
}

module.exports = { generateDarkTheme };