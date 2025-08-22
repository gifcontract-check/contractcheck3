
'use client';

import ContractAnalyzer from '@/components/contract-analyzer';
import SubscriptionDialog from '@/components/subscription-dialog';
import { FileText, Shield } from 'lucide-react';


export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="py-4 border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold text-foreground">
                ContractCheck
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Analyse de contrats par IA</span>
              </div>
              <SubscriptionDialog />
            </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <ContractAnalyzer />
      </main>
      <footer className="py-6">
        <div className="container mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          <p>Powered by ContractCheckAi</p>
          <p className="mt-1">2025 Contract Check. Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
}
