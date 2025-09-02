#!/usr/bin/env node

/**
 * Script to help generate Farcaster cryptographic proof for domain ownership
 * 
 * This script will help you create the required header, payload, and signature
 * for the accountAssociation field in your farcaster.json file.
 * 
 * Usage:
 * 1. Connect your Farcaster custody wallet
 * 2. Sign the message with your domain
 * 3. Extract the required values
 */

const crypto = require('crypto');

console.log('🔐 Farcaster Domain Ownership Proof Generator');
console.log('=============================================\n');

console.log('To generate the required credentials for your farcaster.json file:');
console.log('\n1. Connect your Farcaster custody wallet (e.g., Warpcast, Frame)');
console.log('2. Sign a message containing your domain: luminous-tiramisu-07191b.netlify.app');
console.log('3. Extract the following values from the signed message:');
console.log('   - header: The message header');
console.log('   - payload: The message payload');
console.log('   - signature: The cryptographic signature');

console.log('\n📝 Example message to sign:');
console.log('I am the owner of the domain luminous-tiramisu-07191b.netlify.app');
console.log('Timestamp: ' + new Date().toISOString());

console.log('\n🔑 Required fields for accountAssociation:');
console.log('{');
console.log('  "header": "your-generated-header",');
console.log('  "payload": "your-generated-payload",');
console.log('  "signature": "your-generated-signature"');
console.log('}');

console.log('\n📋 Steps:');
console.log('1. Use your Farcaster wallet to sign the message above');
console.log('2. Copy the header, payload, and signature values');
console.log('3. Update your public/.well-known/farcaster.json file');
console.log('4. Redeploy to Netlify');

console.log('\n💡 Alternative:');
console.log('If you have access to the create-onchain CLI, try:');
console.log('npx create-onchain --manifest');
console.log('(This may require additional setup)');

console.log('\n🚀 After updating farcaster.json, redeploy with:');
console.log('netlify deploy --prod --dir=.next');
