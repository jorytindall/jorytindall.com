import StyleDictionary from 'style-dictionary';
import fs from 'fs-extra';

const webPath = `dist/web/`;

// Clean directories before running
console.log(`cleaning ${webPath}...`);
fs.removeSync(webPath);

console.log('🌞 Building light mode...');

const defaultTheme = StyleDictionary.extend({
  source: [
    'tokens/**/!(*.dark).json'
  ],
  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: webPath,
      files: [{
        destination: `tokens.css`,
        format: `css/variables`,
        options: {
          outputReferences: true
        }
      }]
    },
    scss: {
      transformGroup: `scss`,
      buildPath: webPath,
      files: [{
        destination: `tokens.scss`,
        format: `scss/variables`,
        options: {
          outputReferences: true
        }
      }]
    },
    js: {
      transformGroup: `web`,
      buildPath: webPath,
      files: [{
        destination: `tokens.json`,
        format: `json/flat`
      }]
    },
  },
});

console.log('🌑 Building dark mode...');

const darkTheme = StyleDictionary.extend({
  source: [
    `tokens/**/!(*.light).json`
  ],
  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: webPath,
      files: [{
        destination: `tokens-dark.css`,
        format: `css/variables`,
        options: {
          outputReferences: true
        }
      }]
    },
    scss: {
      transformGroup: `scss`,
      buildPath: webPath,
      files: [{
        destination: `tokens-dark.scss`,
        format: `scss/variables`,
        options: {
          outputReferences: true
        }
      }]
    },
    js: {
      transformGroup: `web`,
      buildPath: webPath,
      files: [{
        destination: `tokens-dark.json`,
        format: `json/flat`
      }]
    },
  }
});

// Build both themes
defaultTheme.buildAllPlatforms();
darkTheme.buildAllPlatforms();

// If you need to export something
export { defaultTheme, darkTheme };