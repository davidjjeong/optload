import { NextResponse } from "next/server";
import { chain } from "@/lib/langchain";

export async function POST(req: Request){
    try {
        const { files } = await req.json();
        const results: unknown[] = [];

        for(const file of files) {
            const text = file.text;
            
            if(!text.trim()) continue;

            const result = await chain.invoke({
                "assignment_name": file.name,
                "text": text,
            });
            console.log(result);
            {/*}
            const response = await llm.generatePrompt([result]);
            console.log(response);
            try {
                let parsed: unknown = null;

                // response.llmOutput may be a string, an object, or undefined.
                if (typeof response.llmOutput === "string") {
                    parsed = JSON.parse(response.llmOutput);
                } else if (response.llmOutput && typeof response.llmOutput === "object") {
                    parsed = response.llmOutput;
                }

                if (parsed) results.push(parsed);
            } catch (err) {
                console.error("Failed to parse LLM output:", err);
                continue;
            }*/}
        }
        // Return results after processing all files
        return NextResponse.json({ results }, { status: 200 });
    } catch (err) {
        console.error("Analyze API Error: ", err);
        return NextResponse.json(
            { error: "Failed to analyze assignments" },
            { status: 500 },
        );
    }
}