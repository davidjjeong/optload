export interface TaskAnalysis {
    id: string; // Supabase UUID
    user_id: string;
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
    created_at: string; // timestamp
}