import YoutubeEmbed from "../elements/YoutubeEmbed"

export default function LinksList({linksData}) {

  return <section>
    {linksData && linksData.map((link) => {
      if (link.youTubeId) {
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
          <a tabindex="-1" key={link.linkText} href={link.href} target="_blank" aria-label={link.linkText}>
            <button>{link.linkText}</button>
          </a>
        )
      }
    })}
    </section>
}
