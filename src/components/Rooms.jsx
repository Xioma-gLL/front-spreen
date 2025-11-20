const rooms = [
  {
    key: 'single',
    desc: { es: 'Una cama individual.', en: 'One single bed.' },
    img: 'http://plazatrujillo.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-09-at-11.21.52-AM-1.jpg',
    href: 'https://plazatrujillo.com/habitaciones/',
  },
  {
    key: 'matrimonial',
    desc: { es: 'Una cama de dos plazas.', en: 'One double bed.' },
    img: 'http://plazatrujillo.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-16-at-2.44.35-PM.jpeg',
    href: 'https://plazatrujillo.com/habitaciones/',
  },
  {
    key: 'double',
    desc: { es: 'Dos camas individuales.', en: 'Two single beds.' },
    img: 'http://plazatrujillo.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-09-at-11.21.47-AM.jpeg',
    href: 'https://plazatrujillo.com/habitaciones/',
  },
]

import Reveal from './Reveal'
import { useI18n } from '../context/LanguageContext'

export default function Rooms() {
  const { t, lang } = useI18n()
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((r, i) => (
            <Reveal key={r.key} delay={i * 100} className="group">
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="overflow-hidden">
                  <img src={r.img} alt={t(`rooms.${r.key}`)} className="h-56 w-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">{t(`rooms.${r.key}`)}</h3>
                  <p className="mt-1 text-gray-600">{r.desc[lang]}</p>
                  <a href={r.href} className="mt-4 inline-block px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">
                    {t('rooms.details')}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}