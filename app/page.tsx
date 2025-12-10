"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <h1 className="font-foreground font-medium text-4xl mb-2">OptLoad</h1>
      <h2 className="font-muted-foreground text-lg mb-4">Optimize your cognitive load.</h2>
      <div className="lg:w-[900px] md:w-[700px] sm:w-[500px] w-[400px]">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your tasks here..."
          className="rounded-3xl"
        />
      </div>
    </div>
  );
}
