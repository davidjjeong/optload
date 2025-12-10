import Tesseract from "tesseract.js";
import { PDFParse } from "pdf-parse";

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
    try {
        const parser = new PDFParse({ data: buffer });
        const result = await parser.getText();
        return result.text || "";
    } catch (err) {
        console.error("Failed to extract text from PDF: ", err);
        return "";
    }
}

export async function extractTextFromImage(buffer: Buffer): Promise<string> {
    try {
        const result = await Tesseract.recognize(buffer, "eng", {
            logger: (m) => console.log(m)
        });
        return result.data.text || "";
    } catch (err) {
        console.error("Failed to extract text from image: ", err);
        return "";
    }
}