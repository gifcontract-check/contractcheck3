"use client";

import { useState, useEffect } from 'react';
import type { AnalysisRecord } from '@/types';
import { analyzeContract } from '@/app/actions';
import ContractForm from '@/components/contract-form';
import AnalysisResults from '@/components/analysis-results';
import { History, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ContractAnalyzer() {
    const [analysis, setAnalysis] = useState<AnalysisRecord | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<AnalysisRecord[]>([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        try {
            const storedHistory = localStorage.getItem('contract-analysis-history');
            if (storedHistory) {
                setHistory(JSON.parse(storedHistory));
            }
        } catch (error) {
            console.error("Failed to load history from localStorage", error);
            toast({
                title: "Error",
                description: "Could not load history.",
                variant: "destructive",
            });
        }
    }, [toast]);

    const saveHistory = (updatedHistory: AnalysisRecord[]) => {
        try {
            localStorage.setItem('contract-analysis-history', JSON.stringify(updatedHistory));
            setHistory(updatedHistory);
        } catch (error) {
            console.error("Failed to save history to localStorage", error);
             toast({
                title: "Error",
                description: "Could not save history.",
                variant: "destructive",
            });
        }
    }

    const handleAnalyze = async (text: string) => {
        if (!text.trim()) {
            toast({
                title: "Error",
                description: "Please provide contract text.",
                variant: "destructive",
            });
            return;
        }
        setIsLoading(true);
        setAnalysis(null);
        const result = await analyzeContract(text);
        setIsLoading(false);

        if (result.error) {
            toast({
                title: "Analysis Error",
                description: result.error,
                variant: "destructive",
            });
        } else if (result.data) {
            const newAnalysis: AnalysisRecord = {
                id: new Date().toISOString(),
                date: new Date().toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                ...result.data,
            };
            setAnalysis(newAnalysis);
            const updatedHistory = [newAnalysis, ...history].slice(0, 20); // Keep last 20
            saveHistory(updatedHistory);
        }
    };

    const handleSelectHistory = (item: AnalysisRecord) => {
        setAnalysis(item);
        setIsSheetOpen(false);
    };

    const handleDeleteHistory = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        const updatedHistory = history.filter(item => item.id !== id);
        saveHistory(updatedHistory);
        if (analysis?.id === id) {
            setAnalysis(null);
        }
    };
    
    const handleClearHistory = () => {
        saveHistory([]);
        setAnalysis(null);
        setIsSheetOpen(false);
    }

    return (
        <div className="max-w-4xl mx-auto">
             <div className="flex justify-between items-center mb-8">
                <div className="text-left">
                    <h2 className="text-4xl font-bold text-foreground">Analyze your contracts</h2>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Your AI lawyer that highlights risky clauses before you sign.
                    </p>
                </div>
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline">
                            <History className="mr-2 h-4 w-4" />
                            History
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-lg flex flex-col">
                        <SheetHeader>
                            <SheetTitle>Analysis History</SheetTitle>
                        </SheetHeader>
                        <div className="py-4 flex-1 flex flex-col min-h-0">
                            {history.length > 0 ? (
                                <>
                                <ScrollArea className="flex-1 pr-4 -mr-4">
                                    <div className="space-y-2">
                                        {history.map(item => (
                                            <div key={item.id} onClick={() => handleSelectHistory(item)} className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50 flex justify-between items-start group">
                                                <div>
                                                    <p className="font-semibold text-sm line-clamp-2">{item.summary}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 shrink-0" onClick={(e) => handleDeleteHistory(e, item.id)}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                {history.length > 0 && <Button variant="destructive" onClick={handleClearHistory} className="mt-4 w-full">Clear history</Button>}
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center h-full">
                                    <p className="text-muted-foreground">No analysis history.</p>
                                </div>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            
            <div className="relative">
                <ContractForm onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>

            {analysis && !isLoading && (
                <div className="mt-12">
                    <AnalysisResults analysis={analysis} />
                </div>
            )}
        </div>
    );
}
