#!/usr/bin/env node

/**
 * Script to query Farcaster APIs and get FID for a username
 * 
 * This script will query various Farcaster indexers to find the FID
 * associated with the username "hassanmubiru"
 */

const https = require('https');

const USERNAME = 'hassanmubiru';

// Farcaster API endpoints
const APIs = [
  {
    name: 'Neynar',
    url: `https://api.neynar.com/v2/farcaster/user/bulk-by-username?usernames=${USERNAME}`,
    headers: {
      'api_key': 'NEYNAR_API_KEY' // You'll need to get a free API key from neynar.com
    }
  },
  {
    name: 'Airstack',
    url: `https://api.airstack.xyz/graphql`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'AIRSTACK_API_KEY' // You'll need to get a free API key from airstack.xyz
    },
    body: JSON.stringify({
      query: `
        query GetUserByUsername($username: String!) {
          FarcasterUsers(
            input: {filter: {userName: {_eq: $username}}, blockchain: ALL}
          ) {
            FarcasterUser {
              userId
              userName
              displayName
              profileImage
              custodyAddress
            }
          }
        }
      `,
      variables: { username: USERNAME }
    })
  },
  {
    name: 'Pinata',
    url: `https://api.pinata.cloud/v3/farcaster/users/${USERNAME}`,
    headers: {
      'Authorization': 'Bearer PINATA_API_KEY' // You'll need to get a free API key from pinata.cloud
    }
  }
];

async function makeRequest(api) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: new URL(api.url).hostname,
      path: new URL(api.url).pathname + new URL(api.url).search,
      method: api.method || 'GET',
      headers: api.headers
    };

    if (api.body) {
      options.headers['Content-Length'] = Buffer.byteLength(api.body);
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ api: api.name, data: jsonData, status: res.statusCode });
        } catch (e) {
          resolve({ api: api.name, data: data, status: res.statusCode });
        }
      });
    });

    req.on('error', (error) => {
      reject({ api: api.name, error: error.message });
    });

    if (api.body) {
      req.write(api.body);
    }
    req.end();
  });
}

async function getFarcasterInfo() {
  console.log(`🔍 Querying Farcaster APIs for username: ${USERNAME}\n`);
  
  console.log('📋 Available APIs (you need API keys for most):');
  console.log('1. Neynar (neynar.com) - Free tier available');
  console.log('2. Airstack (airstack.xyz) - Free tier available');
  console.log('3. Pinata (pinata.cloud) - Free tier available\n');

  console.log('🚀 Quick Test (no API key required):');
  console.log('Let me try to get basic info...\n');

  try {
    // Try a public endpoint first
    const publicUrl = `https://api.warpcast.com/v2/users/${USERNAME}`;
    console.log(`Testing public endpoint: ${publicUrl}`);
    
    const response = await makeRequest({
      name: 'Warpcast Public',
      url: publicUrl,
      headers: {}
    });
    
    console.log(`✅ ${response.api} Response (Status: ${response.status}):`);
    console.log(JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }

  console.log('\n📝 To get your FID, you need to:');
  console.log('1. Get a free API key from one of these services:');
  console.log('   - Neynar: https://neynar.com (recommended)');
  console.log('   - Airstack: https://airstack.xyz');
  console.log('   - Pinata: https://pinata.cloud');
  
  console.log('\n2. Update the script with your API key');
  console.log('3. Run: node scripts/get-farcaster-fid.js');
  
  console.log('\n🔗 Alternative: Check manually at:');
  console.log(`- https://warpcast.com/${USERNAME}`);
  console.log(`- https://farcaster.network/${USERNAME}`);
}

// Run the script
getFarcasterInfo().catch(console.error);
