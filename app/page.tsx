"use client";

import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { extractTextFromFile } from "@/lib/ocr";
import { Send } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  async function handleAnalyze() {
    const llmFiles = await Promise.all(
      files.map(async (file, index) => ({
        name: `Task ${index + 1}`, // Each file named Task 1-5
        type: file.type,
        text: await extractTextFromFile(file),
      }))
    );

    const response = await fetch("api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files: llmFiles }),
    });

    const result = await response.json();
    console.log(result);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <h1 className="font-medium text-4xl mb-4">OptLoad</h1>
      <h2 className="text-muted-foreground text-lg mb-6">Optimize your cognitive load.</h2>
      <div className="lg:w-[800px] md:w-[700px] sm:w-[500px] w-[400px] mb-4">
        <FileUploader onFilesChange={setFiles} />
      </div>
      {files.length > 0 && (
        <Button size="lg" className="text-lg rounded-full font-normal p-6" onClick={handleAnalyze}>
          Optimize <Send />
        </Button>
      )}
    </div>
  );
}
