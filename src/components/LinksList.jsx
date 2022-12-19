import YouTubeDropdown from "../elements/YouTubeDropdown"
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
    } else {
      return (
        <a key={link.linkText} href={link.href}>
          <button>
            {link.linkText}
          </button>
        </a>
      )
    }
  })

  return <main>{linkElements}</main>
}
