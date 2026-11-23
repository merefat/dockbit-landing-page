import Seo from '../components/Seo'
import Domains from '../sections/Domains'
import FinalCta from '../sections/FinalCta'

export default function DomainsPage() {
  return (
    <>
      <Seo path="/domains" />
      <Domains />
      <FinalCta />
    </>
  )
}
