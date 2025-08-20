'use server';
/**
 * @fileOverview This file contains the Genkit flow for providing an overall risk score for a contract.
 *
 * - getContractRiskScore - A function that returns the contract risk score.
 * - GetContractRiskScoreInput - The input type for the getContractRiskScore function.
 * - GetContractRiskScoreOutput - The return type for the getContractRiskScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetContractRiskScoreInputSchema = z.object({
  contractSummary: z.string().describe('A summary of the contract.'),
  riskyClauses: z.string().describe('A list of risky clauses identified in the contract.'),
});
export type GetContractRiskScoreInput = z.infer<typeof GetContractRiskScoreInputSchema>;

const GetContractRiskScoreOutputSchema = z.object({
  riskScore: z.number().describe('An overall risk score for the contract (1-10).'),
});
export type GetContractRiskScoreOutput = z.infer<typeof GetContractRiskScoreOutputSchema>;

export async function getContractRiskScore(input: GetContractRiskScoreInput): Promise<GetContractRiskScoreOutput> {
  return getContractRiskScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getContractRiskScorePrompt',
  input: {schema: GetContractRiskScoreInputSchema},
  output: {schema: GetContractRiskScoreOutputSchema},
  prompt: `You are an AI expert in contract risk assessment.

  Based on the contract summary and the identified risky clauses, provide an overall risk score for the contract.

  The risk score should be a number between 1 and 10, where 1 indicates very low risk and 10 indicates very high risk.

  Contract Summary: {{{contractSummary}}}
  Risky Clauses: {{{riskyClauses}}}

  Consider the severity and likelihood of the risks associated with the identified clauses when determining the overall risk score.
  Return ONLY a number between 1 and 10. No other text is needed.
  `,
});

const getContractRiskScoreFlow = ai.defineFlow(
  {
    name: 'getContractRiskScoreFlow',
    inputSchema: GetContractRiskScoreInputSchema,
    outputSchema: GetContractRiskScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
