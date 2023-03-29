import Header from "./components/Header"
import linksCurrent from "./data/linksCurrent"
import LinksList from "./components/LinksList"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Header />
      <p className="link-writeup">
        Hi! My latest LP, <strong>'Atlantis Tapes'</strong> is out as of
        February 23, 2023 on Bandcamp and streaming services. Art and video
        content by Eli Horn.
        <br />
        <br />I also make the online radio show <strong>
          'Island City'
        </strong>{" "}
        each week for fsr.live. Links below!
      </p>
      <LinksList linksData={linksCurrent} />
      <Footer />
    </>
  )
}

export default App
