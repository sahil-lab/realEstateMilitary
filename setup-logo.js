#!/usr/bin/env node

/**
 * Logo Setup Script for Military Veteran Real Estate Consultancy
 * 
 * This script helps you place your logo.png file in the correct location.
 * 
 * Usage:
 *   node setup-logo.js [path-to-your-logo.png]
 * 
 * Example:
 *   node setup-logo.js ./my-company-logo.png
 *   node setup-logo.js C:/Users/YourName/Desktop/logo.png
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const logoSourcePath = args[0];

// Target location where the logo should be placed
const logoTargetPath = path.join(__dirname, 'backend', 'public', 'images', 'logo.png');

function copyLogo(sourcePath, targetPath) {
    try {
        // Check if source file exists
        if (!fs.existsSync(sourcePath)) {
            console.error('❌ Error: Source logo file not found:', sourcePath);
            console.log('\n💡 Make sure the file path is correct and the file exists.');
            return;
        }

        // Check if source is a PNG file
        if (!sourcePath.toLowerCase().endsWith('.png')) {
            console.warn('⚠️  Warning: File is not a PNG. Continuing anyway...');
        }

        // Ensure target directory exists
        const targetDir = path.dirname(targetPath);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
            console.log('📁 Created directory:', targetDir);
        }

        // Copy the file
        fs.copyFileSync(sourcePath, targetPath);

        console.log('✅ Logo successfully placed!');
        console.log('📍 Source:', sourcePath);
        console.log('📍 Target:', targetPath);
        console.log('\n🎉 Your logo will now appear on:');
        console.log('   • Main website header');
        console.log('   • Admin dashboard');
        console.log('   • Super admin dashboard');
        console.log('   • Registration page');
        console.log('\n🚀 Start your server with: cd backend && npm start');

    } catch (error) {
        console.error('❌ Error copying logo:', error.message);
    }
}

// Main execution
if (!logoSourcePath) {
    console.log('🎨 Military Veteran Real Estate Consultancy - Logo Setup');
    console.log('=====================================\n');
    console.log('Usage: node setup-logo.js [path-to-your-logo.png]\n');
    console.log('Examples:');
    console.log('  node setup-logo.js ./logo.png');
    console.log('  node setup-logo.js C:/Users/YourName/Desktop/company-logo.png');
    console.log('  node setup-logo.js ~/Downloads/logo.png\n');
    console.log('📁 Target location: backend/public/images/logo.png');
    console.log('📐 Recommended size: 150x50 pixels');
    console.log('📋 Format: PNG with transparent background');
} else {
    copyLogo(logoSourcePath, logoTargetPath);
} 