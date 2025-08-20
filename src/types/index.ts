export type RiskClause = {
  clause: string;
  explanation: string;
};

// This represents the data returned from the AI analysis
export type AnalysisData = {
  summary: string;
  riskyClauses: RiskClause[];
  riskScore: number;
  practicalTips: string;
};

// This represents a full analysis record, including metadata for history
export type AnalysisRecord = AnalysisData & {
  id: string;
  date: string;
};
