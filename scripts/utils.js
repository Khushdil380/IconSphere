const fs = require('fs');
const path = require('path');

/**
 * Read an SVG file and return its content
 */
function readSvg(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Optimize SVG for extension clarity and size
 */
function optimizeSvgForExtension(svgContent) {
  let optimized = svgContent;
  
  // Ensure proper viewBox for crisp rendering
  if (!optimized.includes('viewBox')) {
    optimized = optimized.replace('<svg', '<svg viewBox="0 0 16 16"');
  }
  
  // Add shape-rendering for crisp edges
  optimized = optimized.replace(
    /<svg([^>]*)>/,
    '<svg$1 shape-rendering="geometricPrecision">'
  );
  
  // Ensure minimum opacity for visibility
  optimized = optimized.replace(/opacity="0\.[0-4]"/g, 'opacity="0.5"');
  
  return optimized;
}

/**
 * Write SVG content to a file with optimization
 */
function writeSvg(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const optimizedContent = optimizeSvgForExtension(content);
  fs.writeFileSync(filePath, optimizedContent, 'utf8');
}

/**
 * Replace color values in SVG content
 */
function replaceColors(svgContent, colorMap) {
  let result = svgContent;
  
  for (const [oldColor, newColor] of Object.entries(colorMap)) {
    // Replace fill attributes
    result = result.replace(new RegExp(`fill="${oldColor}"`, 'g'), `fill="${newColor}"`);
    result = result.replace(new RegExp(`fill='${oldColor}'`, 'g'), `fill='${newColor}'`);
    
    // Replace stroke attributes
    result = result.replace(new RegExp(`stroke="${oldColor}"`, 'g'), `stroke="${newColor}"`);
    result = result.replace(new RegExp(`stroke='${oldColor}'`, 'g'), `stroke='${newColor}'`);
    
    // Replace currentColor
    if (oldColor === 'currentColor') {
      result = result.replace(/currentColor/g, newColor);
    }
  }
  
  return result;
}

/**
 * Add CSS animations to SVG
 */
function addAnimations(svgContent, animationType = 'breathing') {
  const animations = {
    breathing: `
      <style>
        .animated { 
          animation: breathing 3s ease-in-out infinite;
        }
        @keyframes breathing {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
      </style>`,
    
    pulse: `
      <style>
        .animated { 
          animation: pulse 2.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
      </style>`,
      
    bounce: `
      <style>
        .animated { 
          animation: bounce 3s ease-in-out infinite;
          transform-origin: center bottom;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
      </style>`,

    float: `
      <style>
        .animated { 
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
      </style>`,

    fade: `
      <style>
        .animated { 
          animation: fade 3.5s ease-in-out infinite;
        }
        @keyframes fade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      </style>`
  };

  const styleTag = animations[animationType] || animations.breathing;
  
  // Add the style tag after the opening <svg> tag
  let result = svgContent.replace(
    /<svg([^>]*)>/,
    (match, attributes) => {
      return `<svg${attributes}>${styleTag}`;
    }
  );
  
  // Add the animated class to all main elements (paths, rects, circles, etc.)
  result = result.replace(/<path([^>]*)>/g, '<path class="animated"$1>');
  result = result.replace(/<rect([^>]*)>/g, '<rect class="animated"$1>');
  result = result.replace(/<circle([^>]*)>/g, '<circle class="animated"$1>');
  result = result.replace(/<ellipse([^>]*)>/g, '<ellipse class="animated"$1>');
  result = result.replace(/<polygon([^>]*)>/g, '<polygon class="animated"$1>');
  result = result.replace(/<text([^>]*)>/g, '<text class="animated"$1>');
  
  return result;
}

/**
 * Get all SVG files in a directory
 */
function getSvgFiles(directory) {
  const files = fs.readdirSync(directory);
  return files.filter(file => file.endsWith('.svg'));
}

/**
 * Create icon theme JSON file with comprehensive mappings
 */
function createIconThemeJson(themeName, iconMappings) {
  return JSON.stringify({
    iconDefinitions: iconMappings,
    
    // Hide folder expand/collapse arrows
    hidesExplorerArrows: true,
    
    // File extension mappings
    fileExtensions: {
      "js": "javascript",
      "jsx": "react",
      "ts": "typescript", 
      "tsx": "react_ts",
      "json": "json",
      "css": "css",
      "scss": "sass",
      "sass": "sass",
      "less": "less",
      "html": "html",
      "htm": "html",
      "xml": "xml",
      "yaml": "yaml",
      "yml": "yaml",
      "md": "markdown",
      "py": "python",
      "java": "java",
      "php": "php",
      "rb": "ruby",
      "go": "go",
      "rs": "rust",
      "cpp": "cpp",
      "c": "c",
      "cs": "csharp",
      "vue": "vue",
      "svelte": "svelte",
      "dockerfile": "docker",
      "gitignore": "git",
      "env": "settings"
    },
    
    // Specific file name mappings
    fileNames: {
      "package.json": "nodejs",
      "tsconfig.json": "tsconfig",
      "webpack.config.js": "webpack",
      "gulpfile.js": "gulp",
      "gruntfile.js": "grunt",
      "dockerfile": "docker",
      "docker-compose.yml": "docker",
      ".gitignore": "git",
      "readme.md": "readme",
      "license": "certificate",
      "makefile": "makefile"
    },
    
    // Folder name mappings
    folderNames: {
      "src": "folder-src",
      "dist": "folder-dist",
      "build": "folder-dist",
      "public": "folder-public",
      "assets": "folder-images",
      "images": "folder-images",
      "components": "folder-components",
      "pages": "folder-views",
      "views": "folder-views",
      "styles": "folder-css",
      "css": "folder-css",
      "scss": "folder-sass",
      "sass": "folder-sass",
      "js": "folder-javascript",
      "ts": "folder-typescript",
      "tests": "folder-test",
      "test": "folder-test",
      "__tests__": "folder-test",
      "docs": "folder-docs",
      "node_modules": "folder-node",
      ".git": "folder-git",
      ".vscode": "folder-vscode",
      "utils": "folder-utils",
      "helpers": "folder-helper",
      "config": "folder-config",
      "scripts": "folder-scripts"
    },
    
    // Expanded folder mappings
    folderNamesExpanded: {
      "src": "folder-src-open",
      "dist": "folder-dist-open",
      "build": "folder-dist-open",
      "public": "folder-public-open",
      "assets": "folder-images-open",
      "images": "folder-images-open",
      "components": "folder-components-open",
      "pages": "folder-views-open",
      "views": "folder-views-open",
      "styles": "folder-css-open",
      "css": "folder-css-open",
      "scss": "folder-sass-open",
      "sass": "folder-sass-open",
      "js": "folder-javascript-open",
      "ts": "folder-typescript-open",
      "tests": "folder-test-open",
      "test": "folder-test-open",
      "__tests__": "folder-test-open",
      "docs": "folder-docs-open",
      "node_modules": "folder-node-open",
      ".git": "folder-git-open",
      ".vscode": "folder-vscode-open",
      "utils": "folder-utils-open",
      "helpers": "folder-helper-open",
      "config": "folder-config-open",
      "scripts": "folder-scripts-open"
    },
    
    // Default fallbacks
    file: "document",
    folder: "folder_default",
    folderExpanded: "folder_open",
    
    // Ensure high quality rendering
    showLanguageModeIcons: true
  }, null, 2);
}

module.exports = {
  readSvg,
  writeSvg,
  replaceColors,
  addAnimations,
  getSvgFiles,
  createIconThemeJson,
  optimizeSvgForExtension
};