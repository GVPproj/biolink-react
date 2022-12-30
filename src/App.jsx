import Header from "./components/Header"
import linksCurrent from "./data/linksCurrent"
import LinksList from "./components/LinksList"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Header />
      <LinksList linksData={linksCurrent} />
      <Footer />
    </>
  )
}

export default App
