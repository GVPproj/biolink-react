import { Disclosure } from "@headlessui/react"

export default function YouTubeDropdown(props) {
    
    return(<Disclosure>
        <Disclosure.Button>{props.linkName}</Disclosure.Button>
        <Disclosure.Panel>
          <iframe width="100%" height="400" src={props.iFrame} frameborder="0" > </iframe>
        </Disclosure.Panel>
      </Disclosure>
    )
}
 