import { inngest } from "./client";
import {generateText} from "ai"
import { openai } from '@ai-sdk/openai';
import { firecrawl } from "@/lib/firecrawl";

const URL_REGEX = /https?:\/\/[^\s]+/g;

export const processTask = inngest.createFunction({id: "process-task", triggers: {event: "task.created"}},
    async ({event, step}) =>{

        const {prompt} = event.data as {prompt: string};

        const urls = await step.run("extract-urls", async () =>{
            return prompt.match(URL_REGEX) || [];
        }) as string[];

        const scrapedContent = await step.run("scrape-urls", async () =>{
            const results = await Promise.all(
                urls.map(async (url) =>{
                    const result = await firecrawl.scrape(url, {
                        formats: ["markdown"]
                    });

                    return result.markdown ?? null;
                })
            );

            

            return results.filter(Boolean).join("\n\n") as string;
        })


        const finalPrompt = scrapedContent ? `Question: ${prompt} \n\nContext: ${scrapedContent}` : prompt;
        
        // console.log("Final prompt:", finalPrompt);

        await step.run("generate-text", async () =>{
            const response = await generateText({
                model: openai('gpt-4.1-mini'),
                prompt: finalPrompt,
            });
            return response;
        })
    }
)