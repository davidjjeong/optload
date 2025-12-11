"use client";

import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { extractTextFromFile } from "@/lib/ocr";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    setLoading(true);
    try{
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

      const data = await response.json();
      console.log(data.results);
      toast.success("Analysis complete! Navigate to Results to view.");
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="lg:w-[800px] md:w-[700px] sm:w-[500px] w-[400px] mb-4">
        <FileUploader onFilesChange={setFiles} />
      </div>
      {files.length > 0 && (loading ? (
        <Button 
          size="lg" 
          className="text-lg rounded-full font-normal p-6" 
          onClick={handleAnalyze}
          disabled={loading}
        >
          <Spinner /> Optimizing...
        </Button>
      ) : (
        <Button 
          size="lg" 
          className="text-lg rounded-full font-normal p-6" 
          onClick={handleAnalyze}
          disabled={loading}
        >
          Optimize <Send />
        </Button>
      ))}
    </div>
  );
}
