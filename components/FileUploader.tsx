"use client";

import { useCallback, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { formatFileSize } from "@/lib/utils";
import { FileText, Image, Trash2, Upload } from "lucide-react";
import { Button } from "./ui/button";

interface UploadProps {
    onFilesChange: (files: File[]) => void;
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_FILES = 5;

export default function FileUploader({
    onFilesChange
}: UploadProps){
    const [files, setFiles] = useState<File[]>([]);

    const handleFileSelect = useCallback((incoming: FileList | File[]) => {
        const newFiles = Array.from(incoming);

        if(files.length >= MAX_FILES) { // reject if max files exceeded
            alert(`You can only upload up to ${MAX_FILES} files`);
            return;
        }
        if(incoming[incoming.length - 1].size > MAX_FILE_SIZE){ // check if max file size exceeded
            alert(`Uploaded file exceeded maximum file size`);
            return;
        }
        const combined = [...files, ...newFiles];

        setFiles(combined);
        onFilesChange(combined);
    }, [files, onFilesChange]);

    const removeFile = (index: number) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        onFilesChange(updated);
    };

    return(
        <div className="w-full flex flex-col items-center justify-center">
            <input
                id="file-upload"
                type="file"
                multiple
                accept="application/pdf, image/*"
                onChange={(e) => {
                    if (e.target.files) handleFileSelect(e.target.files);
                }}
                className="hidden"
            />
            <label
                htmlFor="file-upload"
                className="border border-dashed w-[350px] p-4 text-center rounded-lg mb-4 
                flex flex-col items-center justify-center gap-y-2 text-muted-foreground cursor-pointer"
            >
                <Upload size={30} />
                <h1 className="text-chart-1">Upload Task Files</h1>
                <p className="text-sm">Max File Size: 50MB • Max Files: 5</p>
            </label>
            {files.length > 0 && (
                <div className="space-y-4 w-full">
                    <h2 className="">Files ({files.length})</h2>
                    <div className="border text-muted-foreground text-sm rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[60%]">Name</TableHead>
                                    <TableHead className="w-[20%]">Type</TableHead>
                                    <TableHead className="w-[20%]">Size</TableHead>
                                    <TableHead className="w-[20%]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {files.map((file, i) => (
                                    <TableRow key={i} className="text-muted-foreground">
                                        <TableCell className="text-foreground">{file.name}</TableCell>
                                        <TableCell>{file.type.includes("image") ? <Image /> : <FileText />}</TableCell>
                                        <TableCell>{formatFileSize(file.size)}</TableCell>
                                        <TableCell>
                                            <Button variant="foreground" onClick={() => removeFile(i)}>
                                                <Trash2 />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
}