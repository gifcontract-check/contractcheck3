"use client";

import { useState, useRef, type ChangeEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadCloud, Loader2, FileUp, Type } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ContractFormProps {
    onAnalyze: (text: string) => void;
    isLoading: boolean;
}

export default function ContractForm({ onAnalyze, isLoading }: ContractFormProps) {
    const [text, setText] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileRead = (file: File) => {
        if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileText = e.target?.result as string;
                setText(fileText);
                handleSubmit(fileText);
            };
            reader.readAsText(file);
        } else {
            toast({
                title: "Unsupported file type",
                description: "Please upload a .txt file. PDF support is coming soon.",
                variant: "destructive",
            });
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileRead(file);
        }
    };
    
    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }
    
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
           handleFileRead(file);
        }
    }

    const handleSubmit = (textToAnalyze: string) => {
        onAnalyze(textToAnalyze);
    };

    return (
        <Card className="w-full shadow-lg">
            <CardContent className="p-6">
                <Tabs defaultValue="file">
                    <div className="flex justify-center mb-6">
                         <TabsList className="grid w-full grid-cols-2 max-w-sm">
                            <TabsTrigger value="file"><FileUp className="mr-2"/> Upload file</TabsTrigger>
                            <TabsTrigger value="text"><Type className="mr-2"/> Paste text</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="file">
                         <div 
                            className={cn(
                                'relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors', 
                                isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/30 hover:border-primary'
                            )}
                            onClick={() => fileInputRef.current?.click()}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept=".txt"
                                disabled={isLoading}
                            />
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <UploadCloud className="h-10 w-10" />
                                <p className="font-semibold">Click to upload your contract</p>
                                <p className="text-sm">Supported formats: .txt (max. 10MB)</p>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="text">
                        <div className="space-y-4">
                            <Textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Paste the full text of your contract here..."
                                className="min-h-[200px] text-base"
                                aria-label="Contract text input"
                                disabled={isLoading}
                            />
                            <div className="text-center">
                                <Button onClick={() => handleSubmit(text)} disabled={isLoading || !text} size="lg" className="w-full md:w-auto font-semibold">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        'Analyze my contract'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
