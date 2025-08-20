// ContractSummary Flow
//
// This flow summarizes the key terms and obligations in a contract.
//
// - summarizeContract - A function that handles the contract summarization process.
// - SummarizeContractInput - The input type for the summarizeContract function.
// - SummarizeContractOutput - The return type for the summarizeContract function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContractInputSchema = z.object({
  contractText: z.string().describe('The text of the contract to summarize.'),
});
export type SummarizeContractInput = z.infer<typeof SummarizeContractInputSchema>;

const SummarizeContractOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the contract, highlighting key terms and obligations.'),
});
export type SummarizeContractOutput = z.infer<typeof SummarizeContractOutputSchema>;

export async function summarizeContract(input: SummarizeContractInput): Promise<SummarizeContractOutput> {
  return summarizeContractFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeContractPrompt',
  input: {schema: SummarizeContractInputSchema},
  output: {schema: SummarizeContractOutputSchema},
  prompt: `You are an expert legal professional.

  Please provide a concise summary of the following contract, highlighting the key terms and obligations. The summary should be between 5-7 lines.

  Contract Text:
  {{contractText}}`,
});

const summarizeContractFlow = ai.defineFlow(
  {
    name: 'summarizeContractFlow',
    inputSchema: SummarizeContractInputSchema,
    outputSchema: SummarizeContractOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
