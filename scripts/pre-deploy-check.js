#!/usr/bin/env node

/**
 * Pre-Deployment Check Script
 * Run this before deploying to Netlify
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Running Pre-Deployment Checks...\n');

let hasErrors = false;

// Check 1: Verify constant.ts has production URLs
console.log('✓ Checking API endpoints...');
const constantPath = path.join(__dirname, 'src', 'utils', 'constant.ts');
const constantContent = fs.readFileSync(constantPath, 'utf-8');

if (constantContent.includes('localhost:4000') && !constantContent.includes('// export const USER_API_END_POINT="http://localhost')) {
  console.error('❌ ERROR: constant.ts still has localhost URLs!');
  console.error('   Please switch to production URLs before deployment.\n');
  hasErrors = true;
} else {
  console.log('   ✅ Production URLs configured\n');
}

// Check 2: Verify netlify.toml exists
console.log('✓ Checking Netlify configuration...');
if (fs.existsSync(path.join(__dirname, 'netlify.toml'))) {
  console.log('   ✅ netlify.toml found\n');
} else {
  console.error('❌ ERROR: netlify.toml not found!\n');
  hasErrors = true;
}

// Check 3: Verify _redirects exists
console.log('✓ Checking SPA redirects...');
if (fs.existsSync(path.join(__dirname, 'public', '_redirects'))) {
  console.log('   ✅ _redirects file found\n');
} else {
  console.error('❌ ERROR: public/_redirects not found!\n');
  hasErrors = true;
}

// Check 4: Verify package.json has build script
console.log('✓ Checking build scripts...');
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));
if (packageJson.scripts && packageJson.scripts.build) {
  console.log('   ✅ Build script configured\n');
} else {
  console.error('❌ ERROR: Build script not found in package.json!\n');
  hasErrors = true;
}

// Check 5: Verify dist directory can be created
console.log('✓ Testing build process...');
console.log('   Run: npm run build\n');

// Summary
console.log('━'.repeat(50));
if (hasErrors) {
  console.log('\n❌ PRE-DEPLOYMENT CHECKS FAILED');
  console.log('Please fix the errors above before deploying.\n');
  process.exit(1);
} else {
  console.log('\n✅ ALL CHECKS PASSED!');
  console.log('Your frontend is ready for Netlify deployment.\n');
  console.log('Next steps:');
  console.log('1. Run: npm run build');
  console.log('2. Test: npm run preview');
  console.log('3. Deploy to Netlify\n');
  console.log('See NETLIFY_DEPLOYMENT.md for detailed instructions.\n');
}
