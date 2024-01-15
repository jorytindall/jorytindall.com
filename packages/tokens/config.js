const StyleDictionary = require('style-dictionary');
const fs = require('fs-extra');

const webPath = `dist/web/`;

// before this runs we should clean the directories we are generating files in
// to make sure they are ✨clean✨
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
})

// module.exports = styleDictionary.buildAllPlatforms();

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
})

module.exports = defaultTheme.buildAllPlatforms();
module.exports = darkTheme.buildAllPlatforms();
