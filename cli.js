#!/usr/bin/env node
/**
 * VĀK-NLP: Clean Terminal Translator
 */

const readline = require('readline');
const VAKPipeline = require('./src/pipeline');

// Ensure UTF-8 encoding in Windows Terminal
if (process.platform === 'win32') {
  try {
    require('child_process').execSync('chcp 65001', { stdio: 'ignore' });
  } catch (e) {}
}

/**
 * Word wrap helper for clean terminal formatting
 */
function wrapText(text, width = 75, indent = '  ') {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= width) {
      current += ' ' + word;
    } else {
      lines.push(indent + current);
      current = word;
    }
  }
  if (current) {
    lines.push(indent + current);
  }
  return lines.join('\n');
}

/**
 * Convert IAST to simple phonetic English reading
 */
function toPhonetic(iast) {
  if (!iast) return '';
  return iast
    .replace(/ā/g, 'aa')
    .replace(/ī/g, 'ee')
    .replace(/ū/g, 'oo')
    .replace(/ṛ/g, 'ri')
    .replace(/ṝ/g, 'ree')
    .replace(/ś/g, 'sh')
    .replace(/ṣ/g, 'sh')
    .replace(/[ṁṃ]/g, 'm')
    .replace(/ḥ/g, 'h')
    .replace(/ñ/g, 'ny')
    .replace(/ṅ/g, 'ng')
    .replace(/ṭ/g, 't')
    .replace(/ḍ/g, 'd')
    .replace(/ṇ/g, 'n')
    .replace(/\|\|/g, '')
    .replace(/\|/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function translateAndPrint(text) {
  if (!text || !text.trim()) return;
  const result = await VAKPipeline.runAsync(text.trim());
  const devanagari = result.phase2.devanagari;
  const iast = result.phase2.iast;
  const phonetic = toPhonetic(iast);

  const divider = '─'.repeat(78);

  // Also save to output.txt for direct crystal-clear viewing in editor
  const fs = require('fs');
  const path = require('path');
  const fileContent = `INPUT:\n${text.trim()}\n\nSANSKRIT (संस्कृतम्):\n${devanagari}\n\nIAST:\n${iast}\n\nPHONETIC:\n${phonetic}\n`;
  try {
    fs.writeFileSync(path.join(__dirname, 'output.txt'), fileContent, 'utf-8');
  } catch (e) {}

  console.log(`\n\x1b[90m${divider}\x1b[0m`);
  console.log(`\x1b[1m\x1b[36mINPUT:\x1b[0m`);
  console.log(wrapText(text.trim(), 74, '  '));

  console.log(`\n\x1b[1m\x1b[33mSANSKRIT (संस्कृतम्):\x1b[0m`);
  console.log(wrapText(devanagari, 74, '  '));

  console.log(`\n\x1b[1m\x1b[32mIAST (Romanized):\x1b[0m`);
  console.log(wrapText(iast, 74, '  '));

  console.log(`\n\x1b[1m\x1b[35mPHONETIC (Simple):\x1b[0m`);
  console.log(wrapText(phonetic, 74, '  '));
  console.log(`\x1b[90m${divider}\x1b[0m`);
  console.log(`\x1b[90m(Also saved to \x1b[37moutput.txt\x1b[90m)\x1b[0m\n`);
}

async function main() {
  // 1. Single-shot argument
  if (process.argv.length > 2) {
    const input = process.argv.slice(2).join(' ');
    await translateAndPrint(input);
    return;
  }

  // 2. Interactive REPL Mode
  console.log("\n\x1b[1m\x1b[33mVĀK Sanskrit Translator\x1b[0m (Type sentence & press Enter, or 'exit' to quit)\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '\x1b[36mTranslate > \x1b[0m'
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const trimmed = line.trim();
    if (trimmed.toLowerCase() === 'exit' || trimmed.toLowerCase() === 'quit') {
      process.exit(0);
    }
    
    if (trimmed) {
      await translateAndPrint(trimmed);
    }
    rl.prompt();
  });
}

main();
