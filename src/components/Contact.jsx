import Reveal from './Reveal'
import SocialIcons from './SocialIcons'
import { useI18n } from '../context/LanguageContext'
import { Link } from 'react-router-dom'

export default function Contact() {
  const { t } = useI18n()
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="text-2xl font-bold text-gray-900">{t('contact.title')}</h2>
            </Reveal>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <Reveal>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-800">{t('contact.address')}</h4>
                  <p className="mt-1 text-gray-700">Jr. Bolognesi 344 – Centro – Trujillo</p>
                  <p className="mt-1 text-gray-700">Celular: 992810971</p>
                  <p className="mt-1 text-gray-700">Whatsapp: 992810971</p>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-800">{t('contact.email')}</h4>
                  <p className="mt-1 text-gray-700">reservas@plazatrujillo.com</p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={240}>
              <div className="mt-6 flex items-center gap-4">
                <SocialIcons urls={[
                  'https://www.facebook.com/plazatrujillohotel/',
                  'https://wa.me/992810971',
                  'mailto:reservas@plazatrujillo.com',
                ]} />
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#F26A4B] text-white rounded hover:bg-[#8C0808]"
                >
                  {t('contact.write_us')}
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={180}>
            <div>
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
                <iframe
                  title="Ubicación Plaza Trujillo Hotel"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d493.73645563568476!2d-79.0311172!3d-8.1125144!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d83289dc647%3A0x52c50671eea6c15!2sHOTEL%20PLAZA%20TRUJILLO!5e0!3m2!1ses-419!2spe!4v1758062762225!5m2!1ses-419!2spe"
                  className="h-full w-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-2 text-center text-gray-600">{t('contact.locate')}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}