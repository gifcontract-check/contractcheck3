"use client";

import { useState, useRef, type ChangeEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadCloud, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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
            };
            reader.readAsText(file);
        } else {
            toast({
                title: "Type de fichier non supporté",
                description: "Veuillez télécharger un fichier .txt. Le support des PDF sera bientôt disponible.",
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

    const handleSubmit = () => {
        onAnalyze(text);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pt-12">
            <div 
                className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors bg-card ${isDragging ? 'border-primary' : 'border-muted-foreground/50 hover:border-primary'}`}
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
                />
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <UploadCloud className="h-10 w-10" />
                    <p className="font-semibold">Glissez-déposez un fichier ou cliquez pour sélectionner</p>
                    <p className="text-sm">Fichiers .txt uniquement pour le moment</p>
                </div>
            </div>
            
            <div className="relative text-center">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Ou collez le texte
                    </span>
                </div>
            </div>

            <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Collez l'intégralité du texte de votre contrat ici..."
                className="min-h-[250px] text-base"
                aria-label="Contract text input"
            />
            <div className="text-center">
                <Button onClick={handleSubmit} disabled={isLoading || !text} size="lg" className="w-full md:w-auto font-semibold">
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
    );
}
