const items = [
  { key: 'interior', img: 'http://plazatrujillo.com/wp-content/uploads/2020/07/Interior-Suite-Plaza.jpg' },
  { key: 'hall', img: 'http://plazatrujillo.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-14-at-11.20.31-PM.jpeg' },
  { key: 'cafeteria', img: 'http://plazatrujillo.com/wp-content/uploads/2020/07/Restaurante-Suite-Plaza.jpg' },
]

import Reveal from './Reveal'
import { useI18n } from '../context/LanguageContext'

export default function Gallery() {
  const { t } = useI18n()
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i, idx) => (
            <Reveal key={i.key} delay={idx * 120} className="group">
              <figure className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="overflow-hidden">
                  <img src={i.img} alt={t(`gallery.${i.key}`)} className="h-56 w-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                </div>
                <figcaption className="p-4 text-center font-medium text-gray-800">{t(`gallery.${i.key}`)}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}