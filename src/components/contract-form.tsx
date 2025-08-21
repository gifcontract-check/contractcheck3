"use client";

import { useState, useRef, type ChangeEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadCloud, Loader2, FileUp, Type } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ContractFormProps {
    onAnalyze: (text: string) => void;
    isLoading: boolean;
}

const MAX_CHARS = 50000;

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
                if (fileText.length > MAX_CHARS) {
                    toast({
                        title: "Fichier trop volumineux",
                        description: `Le fichier dépasse la limite de ${MAX_CHARS} caractères.`,
                        variant: "destructive",
                    });
                     setText(fileText.substring(0, MAX_CHARS));
                } else {
                    setText(fileText);
                    handleSubmit(fileText);
                }
            };
            reader.readAsText(file);
        } else {
            toast({
                title: "Type de fichier non supporté",
                description: "Veuillez téléverser un fichier .txt. Le support des PDF sera bientôt disponible.",
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
                            <TabsTrigger value="file" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"><FileUp className="mr-2"/> Importer un fichier</TabsTrigger>
                            <TabsTrigger value="text" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"><Type className="mr-2"/> Coller le texte</TabsTrigger>
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
                                <p className="font-semibold">Cliquez pour téléverser votre contrat</p>
                                <p className="text-sm">Formats supportés : .txt (max. 10Mo)</p>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="text">
                        <div className="space-y-2">
                            <Textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Collez le texte intégral de votre contrat ici..."
                                className="min-h-[200px] text-base"
                                aria-label="Zone de texte pour le contrat"
                                disabled={isLoading}
                                maxLength={MAX_CHARS}
                            />
                             <div className="text-right text-xs text-muted-foreground pr-1">
                                {text.length} / {MAX_CHARS}
                            </div>
                            <div className="text-center pt-2">
                                <Button onClick={() => handleSubmit(text)} disabled={isLoading || !text} size="lg" className="w-full md:w-auto font-semibold">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Analyse en cours...
                                        </>
                                    ) : (
                                        'Analyser mon contrat'
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
