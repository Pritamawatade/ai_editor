import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";

export async function POST(){
    await inngest.send({
        name: "task.created",
        data: {
            message: "Hi what's latest version of nextjs? docs: https://nextjs.org/docs/getting-started"
        }
    })


return NextResponse.json({status: "started"})
}