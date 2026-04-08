import Nav              from '../components/Nav'
import HeroSection      from '../sections/HeroSection'
import CompanySection   from '../sections/CompanySection'
import ProblemSection   from '../sections/ProblemSection'
import EvidenceSection  from '../sections/EvidenceSection'
import SolutionSection  from '../sections/SolutionSection'

function Background() {
  return (
    <div className="bg-canvas">
      <div className="bg-grid" />
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />
    </div>
  )
}

function Divider() {
  return <div className="section-divider" />
}

export default function Site() {
  return (
    <>
      <Background />
      <div className="content">
        <Nav />
        <HeroSection />
        <Divider />
        <CompanySection />
        <Divider />
        <ProblemSection />
        <Divider />
        <EvidenceSection />
        <Divider />
        <SolutionSection />
      </div>
    </>
  )
}
