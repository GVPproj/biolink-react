import YouTubeDropdown from "../elements/YouTubeDropdown"
import MixcloudDropdown from "../elements/MixcloudDropdown"
import links from "../links"

export default function LinksList() {
  const linkElements = links.map((link) => {
    if (link.isYouTube) {
      return (
        <YouTubeDropdown
          key={link.linkText}
          linkName={link.linkText}
          id={link.youTubeId}
          title={link.youTubeTitle}
        />
      )
    } else if (link.mixCloud) {
      return (
        <MixcloudDropdown
          key={link.linkText}
          linkName={link.linkText}
          mixCloud={link.mixCloud}
        />
      )
    } else {
      return (
        <a key={link.linkText} href={link.href} target="_blank">
          <button>{link.linkText}</button>
        </a>
      )
    }
  })

  return <main>{linkElements}</main>
}
