import YoutubeEmbed from "../elements/YoutubeEmbed"

export default function LinksList(props) {
  const linkElements = props.linksData.map((link) => {
    if (link.isYouTube) {
      return (
        <YoutubeEmbed
          key={link.linkText}
          linkName={link.linkText}
          id={link.youTubeId}
          title={link.youTubeTitle}
        />
      )
    } else {
      return (
        <a tabindex="-1" key={link.linkText} href={link.href} target="_blank">
          <button>{link.linkText}</button>
        </a>
      )
    }
  })

  return <main>{linkElements}</main>
}
