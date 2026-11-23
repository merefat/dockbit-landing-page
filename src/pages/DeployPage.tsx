import Seo from '../components/Seo'
import Deploy from '../sections/Deploy'
import FinalCta from '../sections/FinalCta'

export default function DeployPage() {
  return (
    <>
      <Seo path="/deploy" />
      <Deploy />
      <FinalCta />
    </>
  )
}
