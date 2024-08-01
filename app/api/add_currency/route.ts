import { currencies } from 'actions/utils/currencies';
import db from 'dbconfig';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get('Authorization')?.split(' ')[1];
    if (auth !== process.env.API_KEY) {
      throw new Error('unauthorized');
    } else {
      const data = await req.json();
      currencies.add(data);
      return new NextResponse(null, {
        status: 200,
      });
    }
  } catch (err: TODO) {
    const msg = err.message;
    if (msg.includes('DUPLICATE') || msg.includes('UNIQUE')) {
      return new NextResponse('A currency with the defined symbol already exists!', {
        status: 409,
      });
    }
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
