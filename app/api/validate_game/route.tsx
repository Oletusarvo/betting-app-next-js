import { games } from '@/utils/games';
import { objectFromQueryParams } from '@/utils/objectFromQueryParams';
import db from 'dbconfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const queryObject = objectFromQueryParams(new URL(req.url).searchParams);
    const game = await games.get(queryObject);

    if (game) {
      return new NextResponse('invalid', {
        status: 200,
      });
    } else {
      return new NextResponse('valid', {
        status: 200,
      });
    }
  } catch (err: any) {
    return new NextResponse(null, {
      status: 500,
    });
  }
}
