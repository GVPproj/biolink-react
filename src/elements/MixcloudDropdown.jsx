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
        <div className="embedded-iframe-container">
          <iframe
            width="100%"
            height="400"
            src={props.mixCloud}
            frameborder="0"
          >
            {" "}
          </iframe>
        </div>
      </Collapse>
    </>
  )
}

// import { Disclosure } from "@headlessui/react"

// export default function YouTubeDropdown(props) {

//     return(<Disclosure>
//         <Disclosure.Button>{props.linkName}</Disclosure.Button>
//         <Disclosure.Panel>
//           <iframe width="100%" height="400" src={props.mixCloud} frameborder="0" > </iframe>
//         </Disclosure.Panel>
//       </Disclosure>
//     )
// }
