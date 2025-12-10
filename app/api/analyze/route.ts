import { NextApiRequest, NextApiResponse } from "next";
import { llm, chatPrompt } from "@/lib/langchain";
import { extractTextFromPDF, extractTextFromImage } from "@/lib/ocr";

type FileInput = {
    name: string;
    type: string;
    data: string;
};

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== "POST"){
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const files: FileInput[] = req.body.files;
        const results = [];

        for(const file of files) {
            const buffer = Buffer.from(file.data, "base64");
            const text = file.type.includes("pdf")
                ? await extractTextFromPDF(buffer)
                : await extractTextFromImage(buffer);
            
            if(!text.trim()) continue;

            const chatPromptValue = await chatPrompt.invoke({
                "assignment_name": file.name,
                text
            });

            const response = await llm.generatePrompt([chatPromptValue]);
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
            }
        }
        // Return results after processing all files
        return res.status(200).json({ results });
    } catch (err) {
        console.error("Analyze API Error: ", err);
        return res.status(500).json({ error: "Failed to analyze assignments" })
    }
}