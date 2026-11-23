import Seo from '../components/Seo'
import StartStairs from '../sections/StartStairs'
import Beyond from '../sections/Beyond'
import FinalCta from '../sections/FinalCta'

export default function GetStartedPage() {
  return (
    <>
      <Seo path="/get-started" />
      <StartStairs />
      <Beyond />
      <FinalCta />
    </>
  )
}
