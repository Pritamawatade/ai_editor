import { inngest } from "./client";
import {generateText} from "ai"
import { openai } from '@ai-sdk/openai';

export const processTask = inngest.createFunction({id: "process-task", triggers: {event: "task.created"}},
    async ({event, step}) =>{
        await step.run("generate-text", async () =>{
            const response = await generateText({
                model: openai('gpt-4o'),
                prompt: `Write a vegetarian lasagna recipe for 4 people`,
            });
            return response;
        })
    }
)