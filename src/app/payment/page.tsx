
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PaymentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="py-4 border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-6 w-6" />
              </Button>
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h1 className="text-xl font-bold text-foreground">
                ContractCheck
              </h1>
            </Link>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Finalisez votre paiement</h1>
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan Pro (Mensuel)</span>
                  <span className="font-semibold">9.99€</span>
                </div>
                 <div className="flex justify-between mt-4 text-xl font-bold">
                  <span>Total</span>
                  <span>9.99€</span>
                </div>
              </CardContent>
            </Card>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Paiement sécurisé par Stripe.</span>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Informations de paiement</CardTitle>
              <CardDescription>Entrez les détails de votre carte de crédit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Numéro de carte</Label>
                <div className="relative">
                  <Input id="card-number" placeholder="0000 0000 0000 0000" />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Date d'expiration</Label>
                  <Input id="expiry" placeholder="MM/AA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="CVC" />
                </div>
              </div>
              <Link href="/success" className="w-full">
                <Button className="w-full" size="lg">Payer 9.99€</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
