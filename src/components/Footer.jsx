import SocialIcons from './SocialIcons'
import { useI18n } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="border-t" style={{ borderColor: '#F26A4B', background: '#F26A4B' }}>
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <SocialIcons urls={[
          'https://www.facebook.com/plazatrujillohotel/',
          'https://wa.me/992810971',
          'mailto:reservas@plazatrujillo.com',
        ]} />
        <div className="text-sm text-[#F2F2F2]">{t('footer.rights')}</div>
      </div>
    </footer>
  )
}