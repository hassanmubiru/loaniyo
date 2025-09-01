import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle Farcaster frame interaction
    // For now, redirect to the main app
    return NextResponse.json({
      success: true,
      redirect: 'https://loaniyo.vercel.app'
    })
  } catch (error) {
    console.error('Frame API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return frame metadata
  return NextResponse.json({
    title: 'Loaniyo - DeFi Lending',
    description: 'Save, borrow, and earn interest with USDC on Base',
    image: 'https://loaniyo.vercel.app/og-image.png',
    buttons: [
      {
        label: 'Save USDC',
        action: 'post'
      },
      {
        label: 'Borrow USDC',
        action: 'post'
      }
    ]
  })
}
