import Link from "next/link";
import Button from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-secondary" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            ¡Pedido Confirmado!
          </h1>

          <p className="text-neutral/70 mb-8 max-w-md mx-auto">
            Gracias por tu compra. Hemos recibido tu pedido y te contactaremos
            pronto a través de correo electrónico con los detalles de envío.
          </p>

          <div className="bg-neutral/5 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <h2 className="font-semibold text-primary mb-3">¿Qué sigue?</h2>
            <ul className="text-left text-sm text-neutral/70 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">1.</span>
                <span>Recibirás un email de confirmación con los detalles de tu pedido</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">2.</span>
                <span>Prepararemos tu café con esmero</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">3.</span>
                <span>Te enviaremos tu pedido a la dirección indicada</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button variant="outline">Seguir Explorando</Button>
            </Link>
            <Link href="/">
              <Button>Volver al Inicio</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
