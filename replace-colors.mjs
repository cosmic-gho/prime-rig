import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(SRC_DIR, (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    if (filePath.endsWith('styles.css')) {
      // Replace CSS definitions
      content = content.replace(/--color-gold/g, '--color-brand-red');
      content = content.replace(/--color-navy-deep/g, '--color-brand-dark');
      content = content.replace(/--color-navy/g, '--color-brand-blue');
      
      content = content.replace(/--gold-foreground/g, '--brand-red-foreground');
      content = content.replace(/--gold/g, '--brand-red');
      content = content.replace(/--navy-deep/g, '--brand-dark');
      content = content.replace(/--navy/g, '--brand-blue');

      content = content.replace(/--shadow-gold:.*?;/g, '--shadow-brand-red: 0 10px 40px -10px oklch(0.62 0.18 29 / 0.35);');

      // Colors
      content = content.replace(/--brand-dark: oklch\(0.18 0.05 260\);/g, '--brand-dark: oklch(0.20 0.02 240);');
      content = content.replace(/--brand-blue: oklch\(0.26 0.06 258\);/g, '--brand-blue: oklch(0.68 0.12 240);');
      content = content.replace(/--brand-red: oklch\(0.78 0.13 85\);/g, '--brand-red: oklch(0.62 0.18 29);');
      content = content.replace(/--brand-red-foreground: oklch\(0.18 0.05 260\);/g, '--brand-red-foreground: oklch(0.98 0.005 90);'); // White text on red

      content = content.replace(/\.btn-gold/g, '.btn-brand-red');
      content = content.replace(/\.btn-navy/g, '.btn-brand-dark');
    }

    // Replace Tailwind classes and generic strings in all files
    content = content.replace(/\bgold\b/g, 'brand-red');
    content = content.replace(/\bnavy-deep\b/g, 'brand-dark');
    content = content.replace(/\bnavy\b/g, 'brand-blue');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
