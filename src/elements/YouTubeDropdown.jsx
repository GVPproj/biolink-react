import { Disclosure } from "@headlessui/react"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "../css/youtube.css"

export default function YouTubeDropdown(props) {
  return (
    <Disclosure>
      <Disclosure.Button>{props.linkName}</Disclosure.Button>
      <Disclosure.Panel>
        <LiteYouTubeEmbed id={props.id} title={props.title} />
      </Disclosure.Panel>
    </Disclosure>
  )
}
