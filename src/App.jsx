import Header from "./components/Header"
import linksCurrent from "./data/linksCurrent"
import LinksList from "./components/LinksList"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Header />
      <p className="link-writeup">
        Hi! My latest ambient record, <strong>'The Lookout'</strong> is out as of July 20th, 2023 on <strong>Bandcamp</strong>, and a little later on streaming services. Art and video
        content as ever by Eli Horn.
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
