import { ChatGroq } from "@langchain/groq";
import {
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    ChatPromptTemplate
} from "@langchain/core/prompts";

// Initialize ChatGroq model
export const llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    apiKey: process.env.GROQ_API_KEY,
});

// Setup prompt template
const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
    "You are an expert in cognitive psychology and learning sciences. Analyze assignments and return JSON only."
);
const humanPrompt = HumanMessagePromptTemplate.fromTemplate(`
Assignment Name: {assignment_name}

Assignment Text: {assignment_text}

Analyze the text of the assignment and compute these values:
- Concept Complexity (ranked from 1 to 10)
- Task Difficulty (ranked from 1 to 10)
- Number of Steps Required for Completion
- Prior Knowledge Required (ranked from 1 to 10)
- Bloom Taxonomy Level (ranked from 1 to 6)
- Estimated Time-to-Completion in minutes

Based on these values, compute:
Cognitive Load Score = 0.4 * Concept Complexity + 0.3 * Task Difficulty + 0.2 * (Steps / 10) + 0.1 * Prior Knowledge
Final Score = 0.5 * Cognitive Load Score + 0.3 * Bloom Level + 0.2 * (ETC_minutes / 30)

Example JSON:
{
    "assignment": "{assignment_name}",
    "concept_complexity": 0,
    "task_difficulty": 0,
    "num_steps": 0,
    "prior_knowledge": 0,
    "cognitive_load_score": 0,
    "bloom_level": 0,
    "etc_minutes": 0,
    "final_score": 0
}
`);

export const chatPrompt = ChatPromptTemplate.fromMessages([systemPrompt, humanPrompt]);