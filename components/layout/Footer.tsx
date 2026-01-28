import Link from "next/link";
import { MapPin, Mail, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-neutral">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Story */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/images/icono.jpg" alt="Adventure Cactus Coffee" className="h-10 w-10 rounded-full" />
              <span className="text-lg font-bold text-secondary">Adventure Cactus Coffee</span>
            </div>
            <p className="text-sm text-neutral/80 mb-4">
              Café de especialidad en Puerto Natales, Chile. El refugio térmico y combustible sensorial para el explorador.
            </p>
            <div className="flex items-center space-x-2 text-sm text-neutral/60">
              <MapPin className="h-4 w-4" />
              <span>Puerto Natales, Chile</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-secondary font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-neutral/80 hover:text-secondary transition-colors">
                  Tienda
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral/80 hover:text-secondary transition-colors">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-secondary font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <a href="mailto:hola@advencac.cl" className="flex items-center space-x-2 text-sm text-neutral/80 hover:text-secondary transition-colors">
                <Mail className="h-4 w-4" />
                <span>hola@advencac.cl</span>
              </a>
              <a href="https://instagram.com/advencac" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-neutral/80 hover:text-secondary transition-colors">
                <Instagram className="h-4 w-4" />
                <span>@advencac</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral/20 text-center text-sm text-neutral/60">
          <p>&copy; {new Date().getFullYear()} Adventure Cactus Coffee. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
