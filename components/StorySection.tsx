import { Mountain, Coffee, Leaf } from "lucide-react";

export default function StorySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            La Vida Florece en la Patagonia
          </h2>
          <p className="text-primary/80 text-lg mb-12 leading-relaxed">
            En Puerto Natales, donde el viento bruja y el paisaje agreste definen el horizonte,
            el cactus representa la resiliencia: la vida floreciendo contra todo pronóstico.
            Nosotros somos ese refugio cálido, ese combustible sensorial que alimenta al explorador
            antes y después de cada aventura en Torres del Paine.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Mountain className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Origen Patagónico</h3>
              <p className="text-sm text-primary/70">
                Tostados en Puerto Natales, la puerta de entrada a Torres del Paine
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Café de Especialidad</h3>
              <p className="text-sm text-primary/70">
                Granos seleccionados, tostado con técnica profesional
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Espíritu de Montaña</h3>
              <p className="text-sm text-primary/70">
                El combustible perfecto para tu próxima aventura
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
