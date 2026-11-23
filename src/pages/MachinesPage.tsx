import Seo from '../components/Seo'
import Machines from '../sections/Machines'
import FinalCta from '../sections/FinalCta'

export default function MachinesPage() {
  return (
    <>
      <Seo path="/machines" />
      <Machines />
      <FinalCta />
    </>
  )
}
