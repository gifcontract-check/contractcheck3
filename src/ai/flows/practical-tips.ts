'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing practical tips and recommendations based on contract analysis.
 *
 * The flow takes contract analysis results as input and returns practical advice to mitigate potential risks.
 *
 * @exports {
 *   practicalTips: (input: PracticalTipsInput) => Promise<PracticalTipsOutput>;
 *   PracticalTipsInput: z.infer<typeof PracticalTipsInputSchema>;
 *   PracticalTipsOutput: z.infer<typeof PracticalTipsOutputSchema>;
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Input schema for the practical tips flow.
 */
const PracticalTipsInputSchema = z.object({
  contractSummary: z
    .string()
    .describe('A summary of the contract, highlighting key terms and obligations.'),
  riskyClauses: z
    .string()
    .describe(
      'A list of potentially risky clauses identified within the contract, with explanations of why they are flagged as risky.'
    ),
  riskScore: z
    .number()
    .describe(
      'An overall risk score (1-10) for the contract, indicating the level of risk.'
    ),
});

export type PracticalTipsInput = z.infer<typeof PracticalTipsInputSchema>;

const TipSchema = z.object({
  title: z.string().describe('The title of the practical tip.'),
  content: z.string().describe('The content of the practical tip.'),
});

/**
 * Output schema for the practical tips flow.
 */
const PracticalTipsOutputSchema = z.object({
  practicalTips: z
    .array(TipSchema)
    .describe(
      'An array of practical advice and recommendations based on the contract analysis to help users better understand and mitigate potential risks.'
    ),
});

export type PracticalTipsOutput = z.infer<typeof PracticalTipsOutputSchema>;

/**
 * Wrapper function for the practicalTipsFlow.
 *
 * @param {PracticalTipsInput} input - The input for the practical tips flow.
 * @returns {Promise<PracticalTipsOutput>} - A promise that resolves to the practical tips output.
 */
export async function practicalTips(input: PracticalTipsInput): Promise<PracticalTipsOutput> {
  return practicalTipsFlow(input);
}

const practicalTipsPrompt = ai.definePrompt({
  name: 'practicalTipsPrompt',
  input: {schema: PracticalTipsInputSchema},
  output: {schema: PracticalTipsOutputSchema},
  prompt: `Based on the following contract analysis, provide practical advice and recommendations to the user to help them better understand and mitigate potential risks. Provide at least 3 tips.

Contract Summary: {{{contractSummary}}}
Risky Clauses: {{{riskyClauses}}}
Risk Score: {{{riskScore}}}

Format your response as a JSON object with a "practicalTips" key containing an array of objects, where each object has a "title" and a "content" field.
`,
});

/**
 * Genkit flow for providing practical tips based on contract analysis.
 */
const practicalTipsFlow = ai.defineFlow(
  {
    name: 'practicalTipsFlow',
    inputSchema: PracticalTipsInputSchema,
    outputSchema: PracticalTipsOutputSchema,
  },
  async input => {
    const {output} = await practicalTipsPrompt(input);
    return output!;
  }
);
