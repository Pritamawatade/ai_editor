import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";

export async function POST(){
    await inngest.send({
        name: "task.created",
        data: {
            message: "Hi"
        }
    })


return NextResponse.json({status: "started"})
}