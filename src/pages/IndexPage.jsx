import React from "react"
import Header from "../components/Header"
import LinksList from "../components/LinksList"
import Footer from "../components/Footer"
import TextComponent from "../components/TextComponent"
import { useQuery } from "@tanstack/react-query"
import { getPb } from "../data/pocketbaseUtils"

export default function IndexPage() {
  const {
    isPending: linksPending,
    error,
    data: links,
  } = useQuery({
    queryKey: ["bioLinks"],
    queryFn: async () => {
      const pb = getPb()
      const { items: links } = await pb.collection("bioLinks").getList(1, 50, {
        sort: "-created",
        fields: "linkText, href, youTubeId, youTubeTitle",
      })
      return links
    },
  })

  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <Header />
      <TextComponent />
      {linksPending ? <div>loading</div> : <LinksList linksData={links} />}
      <Footer />
    </>
  )
}
