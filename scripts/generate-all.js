const { generateDarkTheme } = require('./generate-dark');
const { generateColorfulTheme } = require('./generate-colorful');
const { generateAnimatedTheme } = require('./generate-animated');

console.log('🚀 Generating all icon themes...\n');

async function generateAllThemes() {
  try {
    generateDarkTheme();
    console.log('');
    
    generateColorfulTheme();
    console.log('');
    
    generateAnimatedTheme();
    console.log('');
    
    console.log('🎉 All themes generated successfully!');
    console.log('\n📁 Generated themes:');
    console.log('  • themes/dark/');
    console.log('  • themes/colorful/');
    console.log('  • themes/animated/');
    
  } catch (error) {
    console.error('❌ Error generating themes:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  generateAllThemes();
}

module.exports = { generateAllThemes };