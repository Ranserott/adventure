import { MapPin, Mountain, Coffee, Target, Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-primary overflow-hidden">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral mb-6">
            Nuestra Historia
          </h1>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto">
            El refugio cálido en el fin del mundo
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-primary mb-6">
                  El Cactus: Símbolo de Resiliencia
                </h2>
                <p className="text-primary/70 leading-relaxed mb-6">
                  En Puerto Natales, donde el viento atraviesa las calles y las montañas
                  custodian el horizonte, la vida encuentra formas sorprendentes de florecer.
                  El cactus es nuestro símbolo: representa la capacidad de prosperar en
                  condiciones adversas, de almacenar reservas para los momentos difíciles
                  y de desplegar belleza incluso en los paisajes más agrestes.
                </p>
                <p className="text-primary/70 leading-relaxed">
                  Igual que el cactus, nosotros somos un refugio. Un lugar donde el explorador
                  se detiene, se recalienta y se prepara para la próxima aventura.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 my-16">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Ubicación</h3>
                  <p className="text-sm text-primary/60">
                    Puerto Natales, Chile<br />
                    Puerta de entrada a<br />
                    Torres del Paine
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <Mountain className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Espíritu</h3>
                  <p className="text-sm text-primary/60">
                    Conectamos la técnica<br />
                    profesional del barismo<br />
                    con el espíritu outdoor
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <Coffee className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Propósito</h3>
                  <p className="text-sm text-primary/60">
                    Elevar el estándar<br />
                    del café en el<br />
                    fin del mundo
                  </p>
                </div>
              </div>

              <div className="bg-neutral/5 rounded-lg p-8 my-12">
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                  <Target className="h-6 w-6 text-secondary" />
                  Nuestra Misión
                </h2>
                <p className="text-primary/70 leading-relaxed">
                  Elevar el estándar del café de especialidad en Puerto Natales, uniendo
                  la técnica profesional del barismo con el espíritu aventurero que caracteriza
                  a esta región. Queremos ser el combustible sensorial de cada escalada,
                  cada trekking, cada momento de reflexión frente al horizonte patagónico.
                </p>
              </div>

              <div className="bg-primary/5 rounded-lg p-8 my-12">
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                  <Heart className="h-6 w-6 text-accent" />
                  Lo Que Nos Define
                </h2>
                <ul className="space-y-3 text-primary/70">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Calidad sin compromiso:</strong> Seleccionamos los mejores granos,
                    tostados con precisión y servidos con excelencia.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Conexión local:</strong> Somos parte de esta comunidad,
                    de sus montañas, de sus historias.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Sostenibilidad:</strong> Trabajamos para minimizar
                    nuestro impacto en el entorno que nos inspira.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Pasión por la montaña:</strong> Entendemos al explorador
                    porque somos exploradores.</span>
                  </li>
                </ul>
              </div>

              <div className="text-center mt-16">
                <p className="text-primary/70 mb-6 max-w-2xl mx-auto">
                  ¿Listo para probar el café que alimenta las aventuras en Torres del Paine?
                </p>
                <Link href="/shop">
                  <Button size="lg">Explorar Nuestros Cafés</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
