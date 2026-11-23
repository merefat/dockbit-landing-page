import Seo from '../components/Seo'
import Backups from '../sections/Backups'
import FinalCta from '../sections/FinalCta'

export default function BackupsPage() {
  return (
    <>
      <Seo path="/backups" />
      <Backups />
      <FinalCta />
    </>
  )
}
