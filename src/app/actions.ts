'use server';

import { summarizeContract } from '@/ai/flows/contract-summary';
import { identifyRiskClauses, type IdentifyRiskClausesOutput } from '@/ai/flows/risk-clause-identification';
import { getContractRiskScore } from '@/ai/flows/risk-scoring';
import { practicalTips } from '@/ai/flows/practical-tips';
import type { AnalysisData } from '@/types';

type ActionResponse = {
  data?: AnalysisData;
  error?: string;
};

function formatRiskyClausesForPrompt(clauses: IdentifyRiskClausesOutput): string {
    if (!clauses || clauses.length === 0) {
        return "No risky clauses identified.";
    }
    return clauses.map(c => `Clause: ${c.clause}\nExplanation: ${c.explanation}`).join('\n\n');
}

export async function analyzeContract(contractText: string): Promise<ActionResponse> {
    if (!contractText || !contractText.trim()) {
        return { error: 'Contract text cannot be empty.' };
    }
    
    try {
        const [summaryResult, riskyClauses] = await Promise.all([
            summarizeContract({ contractText }),
            identifyRiskClauses({ contractText }),
        ]);
        
        const summary = summaryResult.summary;
        const riskyClausesString = formatRiskyClausesForPrompt(riskyClauses);

        const riskScoreResult = await getContractRiskScore({
            contractSummary: summary,
            riskyClauses: riskyClausesString,
        });
        const riskScore = riskScoreResult.riskScore;

        const practicalTipsResult = await practicalTips({
            contractSummary: summary,
            riskyClauses: riskyClausesString,
            riskScore: riskScore,
        });
        const tips = practicalTipsResult.practicalTips;

        return {
            data: {
                summary,
                riskyClauses,
                riskScore,
                practicalTips: tips,
            }
        };

    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        return { error: `An error occurred during AI analysis. ${errorMessage}` };
    }
}
