import { NextResponse } from "next/server";

export function routeUnexpectedErrorHandler(err: unknown){
    var message: unknown = null;

    if(typeof err === 'object' && err !== null && 'message' in err){
        message = err.message;
    }
    else{
        message = err;
    }
    
    console.log(message);
    
    return new NextResponse(message as string, {
        status: 500,
    });
}