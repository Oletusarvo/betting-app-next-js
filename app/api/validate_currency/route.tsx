import { currencies } from 'actions/utils/currencies';
import db from 'dbconfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const symbol = new URL(req.url).searchParams.get('symbol');
    if (!symbol) {
      throw new Error('symbol_undefined');
    }

    const result = currencies.validateSymbol(symbol);

    if (!result) {
      return new NextResponse('invalid', {
        status: 200,
      });
    } else {
      return new NextResponse('valid', {
        status: 200,
      });
    }
  } catch (err: TODO) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
