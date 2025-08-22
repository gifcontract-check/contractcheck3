
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="py-4 border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h1 className="text-xl font-bold text-foreground">
                ContractCheck
              </h1>
            </Link>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md text-center shadow-lg">
            <CardHeader>
                <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold mt-4">Paiement réussi !</CardTitle>
                <CardDescription>
                    Merci pour votre abonnement. Vous avez maintenant accès à toutes les fonctionnalités Pro.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/">
                    <Button className="w-full">Retour à l'accueil</Button>
                </Link>
            </CardContent>
        </Card>
      </main>
    </div>
  )
}
