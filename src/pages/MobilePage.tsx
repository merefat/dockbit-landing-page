import Seo from '../components/Seo'
import MobileApp from '../sections/MobileApp'
import FinalCta from '../sections/FinalCta'

export default function MobilePage() {
  return (
    <>
      <Seo path="/mobile" />
      <MobileApp />
      <FinalCta />
    </>
  )
}
