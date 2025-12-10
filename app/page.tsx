"use client";

import FileUploader from "@/components/FileUploader";
import { useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <h1 className="font-medium text-4xl mb-4">OptLoad</h1>
      <h2 className="text-muted-foreground text-lg mb-6">Optimize your cognitive load.</h2>
      <div className="lg:w-[800px] md:w-[700px] sm:w-[500px] w-[400px]">
        <FileUploader onFilesChange={setFiles} />
      </div>
    </div>
  );
}
