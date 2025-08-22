
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Crown, Check, Loader2 } from 'lucide-react';

export default function SubscriptionDialog() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpgrade = () => {
    setIsLoading(true);
    // Navigate to a payment page
    router.push('/payment');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">S'abonner</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Choisissez votre plan</DialogTitle>
          <DialogDescription className="text-center">
            Passez à la version Pro pour des analyses illimitées et des fonctionnalités avancées.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Plan Gratuit</CardTitle>
              <CardDescription>Pour les analyses occasionnelles</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <p className="text-3xl font-bold">0€<span className="text-lg font-normal text-muted-foreground">/mois</span></p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>5 analyses par mois</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Analyse des clauses à risque</span>
                </li>
                 <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Score de risque</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4" disabled>Votre plan actuel</Button>
            </CardContent>
          </Card>
          <Card className="flex flex-col border-primary shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Plan Pro</CardTitle>
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Crown className="h-5 w-5" />
                    <span>Illimité</span>
                </div>
              </div>
              <CardDescription>Pour les professionnels et les entreprises</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
               <p className="text-3xl font-bold">9.99€<span className="text-lg font-normal text-muted-foreground">/mois</span></p>
               <ul className="space-y-2">
                <li className="flex items-center gap-2 font-semibold">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Analyses illimitées</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Analyse des clauses à risque</span>
                </li>
                 <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Score de risque</span>
                </li>
                 <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Conseils pratiques améliorés</span>
                </li>
              </ul>
              <Button className="w-full mt-4" onClick={handleUpgrade} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Chargement...</span>
                  </>
                ) : (
                  'Choisir le plan Pro'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
