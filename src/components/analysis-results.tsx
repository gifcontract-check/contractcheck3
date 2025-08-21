import type { AnalysisRecord } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ShieldCheck, FileText, Lightbulb } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const getRiskInfo = (score: number) => {
    if (score <= 3) return { text: 'text-green-600', level: 'Faible' };
    if (score <= 7) return { text: 'text-yellow-600', level: 'Moyen' };
    return { text: 'text-red-600', level: 'Élevé' };
};

const RiskScoreIndicator = ({ score }: { score: number }) => {
    const { text: textColor, level } = getRiskInfo(score);
    
    return (
        <div className="flex flex-col items-center justify-center gap-4 h-full">
             <div className="relative h-36 w-36">
                 <svg className="h-full w-full" viewBox="0 0 100 100">
                     <circle
                         className="stroke-current text-muted/50"
                         strokeWidth="10"
                         cx="50"
                         cy="50"
                         r="40"
                         fill="transparent"
                     ></circle>
                     <circle
                         className={`stroke-current ${textColor}`}
                         strokeWidth="10"
                         cx="50"
                         cy="50"
                         r="40"
                         fill="transparent"
                         strokeDasharray="251.2"
                         strokeDashoffset={251.2 - (251.2 * score * 10) / 100}
                         strokeLinecap="round"
                         transform="rotate(-90 50 50)"
                         style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                     ></circle>
                     <text x="50" y="52" textAnchor="middle" dy=".3em" className="text-4xl font-bold fill-current text-foreground">{score}</text>
                 </svg>
             </div>
             <p className="text-xl font-bold">Niveau de risque : <span className={textColor}>{level}</span></p>
             <div className="flex justify-between w-full max-w-xs text-xs text-muted-foreground">
                <span>Risque faible (1)</span>
                <span>Risque élevé (10)</span>
            </div>
        </div>
    );
};

export default function AnalysisResults({ analysis }: { analysis: AnalysisRecord }) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold text-center font-headline">Résultats de l'analyse</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <Card className="lg:col-span-1 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <FileText className="h-6 w-6 text-primary"/>
                            <span>Résumé du contrat</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{analysis.summary}</p>
                    </CardContent>
                </Card>
                
                <Card className="lg:col-span-1 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <ShieldCheck className="h-6 w-6 text-primary"/>
                            <span>Score de risque global</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RiskScoreIndicator score={analysis.riskScore} />
                    </CardContent>
                </Card>

                {analysis.riskyClauses && analysis.riskyClauses.length > 0 && (
                    <Card className="lg:col-span-2 shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <AlertTriangle className="h-6 w-6 text-destructive"/>
                                <span>Clauses à risque identifiées</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {analysis.riskyClauses.map((item, index) => (
                                <div key={index} className="p-4 border-l-4 border-destructive bg-destructive/10 rounded-r-md">
                                    <blockquote className="italic text-foreground font-semibold">
                                        "{item.clause}"
                                    </blockquote>
                                    <p className="mt-2 text-sm text-muted-foreground">{item.explanation}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                <Card className="lg:col-span-2 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <Lightbulb className="h-6 w-6 text-yellow-500"/>
                            <span>Conseils pratiques</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                           {analysis.practicalTips.map((tip, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                               <AccordionTrigger className="font-semibold text-left">{tip.title}</AccordionTrigger>
                               <AccordionContent className="text-muted-foreground whitespace-pre-wrap">
                                 {tip.content}
                               </AccordionContent>
                             </AccordionItem>
                           ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}