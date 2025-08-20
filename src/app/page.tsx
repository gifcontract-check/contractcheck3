import ContractAnalyzer from '@/components/contract-analyzer';
import { FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold font-headline text-primary">
            ContractCheck
          </h1>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          Votre avocat IA qui surligne les clauses à risque avant que vous signiez.
        </p>
      </header>
      <main className="flex-grow container mx-auto px-4 pb-8">
        <ContractAnalyzer />
      </main>
      <footer className="py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Powered by GenAI
        </div>
      </footer>
    </div>
  );
}
