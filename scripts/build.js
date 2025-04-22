const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the script is running in the right environment
console.log('Build script started...');
console.log(`Node version: ${process.version}`);
console.log(`Working directory: ${process.cwd()}`);

try {
  // Run the Next.js build
  console.log('Building Next.js application...');
  execSync('next build', { stdio: 'inherit' });

  // Create a _redirects file in the .next directory for Netlify
  console.log('Creating Netlify redirects file...');
  const redirectsContent = '/*    /index.html   200';
  fs.writeFileSync(path.join(process.cwd(), '.next', '_redirects'), redirectsContent);

  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 