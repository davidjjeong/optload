import { ChatGroq } from "@langchain/groq";
import {
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    ChatPromptTemplate
} from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";

// Initialize ChatGroq model
const llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    apiKey: process.env.GROQ_API_KEY,
});

// Setup prompt template
const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
`You are an expert in cognitive psychology and learning sciences. Analyze the assignment text and compute these values:
Analyze the text of the assignment and compute these values:
- Concept Complexity (ranked from 1 to 10)
- Task Difficulty (ranked from 1 to 10)
- Number of Steps Required for Completion (maximum 100)
- Prior Knowledge Required (ranked from 1 to 10)
- Bloom Taxonomy Level (ranked from 1 to 6)
- Estimated Time-to-Completion in minutes (maximum 10080 minutes, i.e. 7 days)

Follow these rules STRICTLY when estimating number of steps required and estimated time-to-completion:
- Break the task into subtasks explicitly (each subtask = one step)
- Calculate as accurately as possible how much time each subtask would take
- Sum up the time to compute the estimated time-to-completion in minutes
(You are an expert in time estimation.)

Based on these values, compute:
Cognitive Load Score = 0.4 * Concept Complexity + 0.3 * Task Difficulty + 0.2 * (Steps / 10) + 0.1 * Prior Knowledge
Final Score = 0.5 * Cognitive Load Score + 0.3 * (Bloom Level * 10 / 6) + 0.2 * (ETC_minutes / 30) * (10 / 336)

Then, return JSON only with this structure:
{{
    "assignment": "{assignment_name}", // MUST match exactly the input assignment_name
    "description": "keywords that define the assignment", // MUST be three words maximum, be precise as possible
    "concept_complexity": concept complexity value,
    "task_difficulty": task difficulty value,
    "num_steps": number of steps required for completion,
    "prior_knowledge": prior knowledge value,
    "cognitive_load_score": cognitive load score calculated above,
    "bloom_level": bloom taxonomy level value,
    "etc_minutes": estimated time-to-completion in minutes calculated above,
    "final_score": final score calculated above,
}}

Do NOT change the value of "assignment". It must exactly match teh input assignment_name.
`
);
const humanPrompt = HumanMessagePromptTemplate.fromTemplate("{text}");
const chatPrompt = ChatPromptTemplate.fromMessages([systemPrompt, humanPrompt]);

export const chain = chatPrompt.pipe(llm).pipe(new JsonOutputParser());