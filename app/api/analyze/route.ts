import { NextResponse } from "next/server";
import { chain } from "@/lib/langchain";
import { createClient } from "@/lib/supabase/server";

interface TaskAnalysis {
    assignment: string;
    description: string;
    concept_complexity: number;
    task_difficulty: number;
    num_steps: number;
    prior_knowledge: number;
    cognitive_load_score: number;
    bloom_level: number;
    etc_minutes: number;
    final_score: number;
}

interface inputFile {
    name: string;
    type: string;
    text: string;
}

export async function POST(req: Request){
    try {
        const { files } = await req.json();
        //const results: TaskAnalysis[] = [];

        const supabase = await createClient(); // server-side Supabase client
        const { data: {user} } = await supabase.auth.getUser();

        if(!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const start = performance.now();
        
        const results = await Promise.all(
            files.map(async (file: inputFile) => {
                const result = await chain.invoke({
                    "assignment_name": file.name,
                    "text": file.text
                }) as TaskAnalysis;

                return result;
            })
        );
        /*
        for(const file of files) {
            const text = file.text;
            
            if(!text.trim()) continue;

            const result = await chain.invoke({
                "assignment_name": file.name,
                "text": text,
            }) as TaskAnalysis;
            results.push(result);
        }*/
        const end = performance.now();
        console.log(`Total batch latency: ${(end - start).toFixed(2)} ms`);

        const supabaseResults = results.map((r, index)=> ({
            user_id: user.id,
            assignment: `Task ${index + 1}`,
            description: r.description,
            concept_complexity: r.concept_complexity,
            task_difficulty: r.task_difficulty,
            num_steps: r.num_steps,
            prior_knowledge: r.prior_knowledge,
            cognitive_load_score: r.cognitive_load_score,
            bloom_level: r.bloom_level,
            etc_minutes: r.etc_minutes,
            final_score: r.final_score,
        }));

        const { error: insertError } = await supabase
            .from("assignment_analysis")
            .insert(supabaseResults);
        
        if(insertError) {
            console.error("Supabase Insert Error: ", insertError);
            return NextResponse.json({ error: "Failed to store analysis" }, { status: 500 });
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