const path = require('path');
const { readSvg, writeSvg, replaceColors, getSvgFiles, createIconThemeJson } = require('./utils');

function generateColorfulTheme() {
  console.log('🎨 Generating Colorful Theme...');
  
  const iconsDir = path.resolve(__dirname, '../icons');
  const outputDir = path.resolve(__dirname, '../themes/colorful/icons');
  const svgFiles = getSvgFiles(iconsDir);
  
  const iconDefinitions = {};
  
  svgFiles.forEach(file => {
    const inputPath = path.join(iconsDir, file);
    const outputPath = path.join(outputDir, file);
    const iconName = path.parse(file).name;
    
    console.log(`  Processing: ${file}`);
    
    // For colorful theme, use the base icons as-is (they're already colorful)
    const svgContent = readSvg(inputPath);
    
    // Just copy the original colorful icons without modification
    writeSvg(outputPath, svgContent);
    
    iconDefinitions[iconName] = {
      iconPath: `./icons/${file}`
    };
  });
  
  // Create theme JSON
  const themeJson = createIconThemeJson('colorful', iconDefinitions);
  const themeJsonPath = path.resolve(__dirname, '../themes/colorful/colorful-icon-theme.json');
  
  require('fs').writeFileSync(themeJsonPath, themeJson, 'utf8');
  
  console.log(`✅ Colorful theme generated with ${svgFiles.length} icons`);
  console.log(`   Icons: ${outputDir}`);
  console.log(`   Theme: ${themeJsonPath}`);
}

if (require.main === module) {
  generateColorfulTheme();
}

module.exports = { generateColorfulTheme };