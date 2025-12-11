import { NextResponse } from "next/server";
import { chain } from "@/lib/langchain";

interface TaskAnalysis {
    assignment: string;
    concept_complexity: number;
    task_difficulty: number;
    num_steps: number;
    prior_knowledge: number;
    cognitive_load_score: number;
    bloom_level: number;
    etc_minutes: number;
    final_score: number;
}

export async function POST(req: Request){
    try {
        const { files } = await req.json();
        const results: TaskAnalysis[] = [];

        for(const file of files) {
            const text = file.text;
            
            if(!text.trim()) continue;

            const result = (await chain.invoke({
                "assignment_name": file.name,
                "text": text,
            })) as TaskAnalysis;
            results.push(result);
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