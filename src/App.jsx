import Header from "./components/Header"
import linksCurrent from "./data/linksCurrent"
import LinksList from "./components/LinksList"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Header />
      <p className="link-writeup">
        Hi! I'm releasing a new ambient LP entitled{" "}
        <strong>'Atlantis Tapes'</strong> on February 23, 2023! The first two
        singles are out and listenable on Bandcamp and streaming services. Art
        and video content by Eli Horn. Check links and videos below...
      </p>
      <LinksList linksData={linksCurrent} />
      <Footer />
    </>
  )
}

export default App
