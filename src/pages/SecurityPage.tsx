import Seo from '../components/Seo'
import SecuritySage from '../sections/SecuritySage'
import FinalCta from '../sections/FinalCta'

export default function SecurityPage() {
  return (
    <>
      <Seo path="/security" />
      <SecuritySage />
      <FinalCta />
    </>
  )
}
