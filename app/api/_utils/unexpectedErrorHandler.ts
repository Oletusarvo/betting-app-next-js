import { NextResponse } from "next/server";

export function unexpectedErrorHandler(err: Error){
    const message = err.message;
    console.log(message);
    
    return new NextResponse(err.message, {
        status: 500,
    });
}