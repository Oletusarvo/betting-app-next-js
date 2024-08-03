import db from 'dbconfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');

    const [total] = await db('data_currencies').where({ id }).pluck('inCirculation');
    return new NextResponse(total.toString(), {
      status: 200,
    });
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
