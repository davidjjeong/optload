import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { TaskAnalysis } from "@/lib/types/TaskAnalysis";

export async function GET() {
    const supabase = await createClient(); // server-side Supabase client
    const { data: { user } } = await supabase.auth.getUser();
    
    if(!user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get latest created_at for this user
    const { data: latest, error: latestError } = await supabase
    .from("assignment_analysis")
    .select("created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

    if(latestError || !latest) {
        return NextResponse.json({ results: [] }, { status: 200 });
    }

    // Fetch all rows with the latest created_at
    const { data: rows, error } = await supabase
    .from("assignment_analysis")
    .select("*")
    .eq("user_id", user.id)
    .eq("created_at", latest.created_at)
    .order("assignment");

    if(error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ results: rows as TaskAnalysis[] }, { status: 200 });
}