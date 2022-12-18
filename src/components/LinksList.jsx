import { Disclosure } from "@headlessui/react"

export default function LinksList() {
  return (
    <main>
      <Disclosure>
        <Disclosure.Button>A youtube vid</Disclosure.Button>

        <Disclosure.Panel>
          <iframe
            width="400"
            height="224"
            src="https://www.youtube.com/embed/gJaRNO18Y54"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Disclosure.Panel>
      </Disclosure>
      <button>A link</button>
    </main>
  )
}
