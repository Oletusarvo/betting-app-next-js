import { games } from '@/utils/games';
import { objectFromQueryParams } from '@/utils/objectFromQueryParams';
import db from 'dbconfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const queryObject = objectFromQueryParams(new URL(req.url).searchParams);
    const games = await db('games').where(queryObject);
    return new NextResponse(JSON.stringify(games), {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(null, {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const game = await req.json();
    await games.add(game);
    return new NextResponse(null, {
      status: 200,
    });
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse(null, {
      status: 500,
    });
  }
}
