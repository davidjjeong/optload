import { createWorker } from 'tesseract.js';

export async function extractTextFromFile(file: File): Promise<string> {
    //const buffer = await file.arrayBuffer();

    if(file.type.startsWith("image")) {
        const worker = await createWorker("eng");
        const result = await worker.recognize(file);
        await worker.terminate();
        return result.data.text || "";
    }

    return await file.text();
}