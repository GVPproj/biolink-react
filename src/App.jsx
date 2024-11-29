import React, { useEffect } from "react"
import Header from "./components/Header"
import linksCurrent from "./data/linksCurrent"
import LinksList from "./components/LinksList"
import Footer from "./components/Footer"
import { getPb } from "./data/pocketbaseUtils"

function App() {
  const [links, setLinks] = React.useState([])

  useEffect(() => {
    const pb = getPb()
    const getLinks = async () => {
      const { items: links } = await pb.collection("bioLinks").getList(1, 50, {
        sort: "-created",
        fields: "linkText, href, youTubeId, youTubeTitle",
      })

      setLinks(links)
    }
    getLinks()
  }, [])

  return (
    <>
      <Header />
      <h3>Think About Life - 2024 fundraiser!</h3>
      <p className="fundraiser">
        Martin from our band has been helping out with Maison Elizabeth House in
        NDG.
        <br />
        <br />
        Maison Elizabeth House is an NPO that offers support services to young
        parents experiencing difficulties.
        <br />
        <br />
        If you don't have a copy of our 2006 self titled LP on vinyl (or want to
        get it for someone as a holiday gift), now is the time! Copies can be
        picked up from Phonopolis record store in Montreal, or we can ship em
        :).
        <br />
        <br />
        All proceeds from any digital or physical sales of the band's
        self-titled on Bandcamp (until the end of the year) will go towards this
        local Montreal charity. Link below!
      </p>
      <hr
        style={{
          border: "1px solid hsl(0, 100%, 100%, 0.17)",
          width: "100%",
          marginBottom: "2em",
        }}
      />
      <p className="link-writeup">
        Hi! My latest ambient record, <strong>'The Lookout'</strong> is out as
        of July 20th, 2023 on <strong>Bandcamp</strong>, and a little later on
        streaming services. Art and video content as ever by Eli Horn.
        <br />
        <br />I also make the online radio show <strong>
          'Island City'
        </strong>{" "}
        each week for fsr.live.
      </p>
      {/* <LinksList linksData={linksCurrent} /> */}
      <LinksList linksData={links} />
      <Footer />
    </>
  )
}

export default App
