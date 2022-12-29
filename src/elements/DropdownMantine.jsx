import { useState } from "react"
import { Button, Collapse } from "@mantine/core"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "../css/youtube.css"

export default function DropdownMantine(props) {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <button onClick={() => setOpened((o) => !o)}>{props.linkName}</button>

      <Collapse in={opened} transitionDuration={1000}>
        <div>
          <LiteYouTubeEmbed id={props.id} title={props.title} />
        </div>
      </Collapse>
    </>
  )
}
