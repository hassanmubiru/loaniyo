#!/usr/bin/env node

/**
 * Simple script to get Farcaster user info using Neynar API
 * 
 * Usage:
 * 1. Get free API key from https://neynar.com
 * 2. Set your API key below
 * 3. Run: node scripts/get-fid-simple.js
 */

const https = require('https');

// ⚠️  REPLACE WITH YOUR ACTUAL API KEY from https://neynar.com
const NEYNAR_API_KEY = 'YOUR_NEYNAR_API_KEY_HERE';

// Replace with your actual Farcaster username
const USERNAME = 'hassanmubiru';

async function getFarcasterUser() {
  if (NEYNAR_API_KEY === 'YOUR_NEYNAR_API_KEY_HERE') {
    console.log('❌ Please set your Neynar API key in the script first!');
    console.log('1. Go to https://neynar.com');
    console.log('2. Sign up for a free account');
    console.log('3. Get your API key');
    console.log('4. Update the script with your key');
    console.log('5. Run this script again\n');
    return;
  }

  const url = `https://api.neynar.com/v2/farcaster/user/bulk-by-username?usernames=${USERNAME}`;
  
  const options = {
    hostname: 'api.neynar.com',
    path: `/v2/farcaster/user/bulk-by-username?usernames=${USERNAME}`,
    method: 'GET',
    headers: {
      'api_key': NEYNAR_API_KEY
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function main() {
  console.log(`🔍 Getting Farcaster info for username: ${USERNAME}\n`);
  
  try {
    const result = await getFarcasterUser();
    
    if (result.status === 200) {
      console.log('✅ Success! Here\'s your Farcaster info:\n');
      console.log(JSON.stringify(result.data, null, 2));
      
      // Extract key information
      if (result.data.users && result.data.users.length > 0) {
        const user = result.data.users[0];
        console.log('\n📋 Key Information:');
        console.log(`FID: ${user.fid}`);
        console.log(`Username: ${user.username}`);
        console.log(`Display Name: ${user.display_name}`);
        console.log(`Custody Address: ${user.custody_address}`);
        
        console.log('\n🔧 Next Steps:');
        console.log('1. Update your farcaster.json with this info');
        console.log('2. Generate the cryptographic proof');
        console.log('3. Redeploy to Netlify');
      }
    } else {
      console.log(`❌ API Error (Status: ${result.status}):`);
      console.log(result.data);
    }
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

main();
