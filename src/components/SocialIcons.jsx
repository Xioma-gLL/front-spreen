import { SocialIcon } from 'react-social-icons'

export default function SocialIcons({ urls = [], size = 32 }) {
  const color = '#1f2937'
  return (
    <div className="flex items-center gap-3">
      {urls.map((u) => (
        <SocialIcon
          key={u}
          url={u}
          bgColor={color}
          fgColor="#ffffff"
          style={{ height: size, width: size }}
        />
      ))}
    </div>
  )
}