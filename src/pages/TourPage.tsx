import Seo from '../components/Seo'
import SectionHead from '../components/SectionHead'
import Tour from '../sections/Tour'
import GoalWalkthrough from '../components/GoalWalkthrough'
import FinalCta from '../sections/FinalCta'

export default function TourPage() {
  return (
    <>
      <Seo path="/tour" />
      <Tour />
      <section className="wrap sec" id="walkthrough">
        <SectionHead
          eyebrow="Step by step"
          title={
            <>
              Pick a goal.
              <br />
              Follow <em>the steps.</em>
            </>
          }
          lede="Choose what you want to do. Each path shows the exact clicks, and what DockBit handles for you."
        />
        <GoalWalkthrough />
      </section>
      <FinalCta />
    </>
  )
}
