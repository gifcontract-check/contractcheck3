'use server';

/**
 * @fileOverview Identifies potentially risky clauses in a contract and explains why they are flagged.
 *
 * - identifyRiskClauses - A function that handles the identification of risky clauses in a contract.
 * - IdentifyRiskClausesInput - The input type for the identifyRiskClauses function.
 * - IdentifyRiskClausesOutput - The return type for the identifyRiskClauses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyRiskClausesInputSchema = z.object({
  contractText: z
    .string()
    .describe('The text of the contract to analyze for risky clauses.'),
});
export type IdentifyRiskClausesInput = z.infer<typeof IdentifyRiskClausesInputSchema>;

const RiskClauseSchema = z.object({
  clause: z.string().describe('The text of the risky clause.'),
  explanation: z
    .string()
    .describe('An explanation of why the clause is considered risky.'),
});

const IdentifyRiskClausesOutputSchema = z.array(RiskClauseSchema).describe('An array of risky clauses found in the contract.');
export type IdentifyRiskClausesOutput = z.infer<typeof IdentifyRiskClausesOutputSchema>;

export async function identifyRiskClauses(
  input: IdentifyRiskClausesInput
): Promise<IdentifyRiskClausesOutput> {
  return identifyRiskClausesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyRiskClausesPrompt',
  input: {schema: IdentifyRiskClausesInputSchema},
  output: {schema: IdentifyRiskClausesOutputSchema},
  prompt: `You are a legal expert reviewing contracts to identify potentially risky clauses.

  Analyze the following contract text and identify any clauses that could be problematic for the user.
  For each risky clause, provide the clause text and a clear explanation of why it is considered risky.

  Contract Text: {{{contractText}}}
  \n
  Format your response as a JSON array of objects, where each object has a "clause" and an "explanation" field.
  `,
});

const identifyRiskClausesFlow = ai.defineFlow(
  {
    name: 'identifyRiskClausesFlow',
    inputSchema: IdentifyRiskClausesInputSchema,
    outputSchema: IdentifyRiskClausesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
