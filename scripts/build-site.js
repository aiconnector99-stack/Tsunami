// Builds the public site (privacy policy) from PRIVACY.md into _site/.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const md = fs.readFileSync(path.join(root, 'PRIVACY.md'), 'utf8');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = s => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/_(.+?)_/g, '<em>$1</em>')
  .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
const body = md.trim().split(/\n\s*\n/).map(block => {
  const b = block.trim();
  if (b.startsWith('# ')) return `<h1>${inline(b.slice(2))}</h1>`;
  if (b.startsWith('## ')) return `<h2>${inline(b.slice(3))}</h2>`;
  return `<p>${inline(b.replace(/\n/g, ' '))}</p>`;
}).join('\n');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tsunami Privacy Policy</title>
<style>
  :root { --bg: #f4f9fc; --ink: #0b2540; --dim: #4a6680; --card: #ffffff; --edge: #d6e6f0; }
  @media (prefers-color-scheme: dark) { :root { --bg: #0a1a2f; --ink: #e8f6ff; --dim: #9cc3dd; --card: #0f2740; --edge: #1d3d5c; } }
  body { margin: 0; background: var(--bg); color: var(--ink); font: 17px/1.6 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  main { max-width: 680px; margin: 0 auto; padding: 40px 16px 64px; }
  article { background: var(--card); border: 1px solid var(--edge); border-radius: 18px; padding: 28px 24px; }
  h1 { margin: 0 0 8px; font-size: 28px; line-height: 1.2; }
  h1 + p { color: var(--dim); margin-top: 0; }
  a { color: #1a9fb3; }
</style>
</head>
<body>
<main><article>
${body}
</article></main>
</body>
</html>
`;
const out = path.join(root, '_site');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
fs.writeFileSync(path.join(out, 'privacy.html'), html);
fs.writeFileSync(path.join(out, 'index.html'), html);
console.log('_site/ built');
