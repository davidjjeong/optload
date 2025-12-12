# OptLoad - Optimize Your Cognitive Load
OptLoad is a web application built with NEXT.js, LangChain, and Supabase designed to provide users a precise, accurate comparison of task load given a set of tasks that a user needs to complete. OptLoad is meant to provide a big picture of task difficulty and effort needed to complete each task, so that the user can plan and prepare better for task completion based on the results from the application.

Currently, OptLoad has two main features:
- Home: User can upload up to 5 task files (supports image only for now), each file capped at a maximum size of 50 MB. Once the files are uploaded, the user can hit the "Optimize" button, which will query a chat prompt to openai/gpt-oss-120b model through LangChain and Groq API.
- Results: User can view the latest task load analysis. This section displays a clean, intuitive dashboard of overall task and cognitive load scores, estimated hours to complete all tasks, etc. Even after the user signs out, the task analysis will be saved in a database hosted by Supabase, so the user can log back in next time to view his/her last task analysis.

## TODO
- Deploy current beta version to Vercel
- Add new features (**Customize**: Allows users to customize the settings of the GPT model used for task analysis. **Plan**: Helps the user plan the "what" and "how" for task completion based on the analysis in the Results section.)
