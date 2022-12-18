import SocialIcon from "./Tooltip"

export default function Header() {
  return (
    <header>
      <img
        className="headshot"
        src="/graham.png"
        alt="photo of Graham Van Pelt"
      ></img>
      <img
        className="logo"
        src="/gvp-at-namecrop.jpg"
        alt="Graham Van Pelt"
      ></img>
      <div className="socials-div">
        <SocialIcon
          href="https://www.instagram.com/grahamvanpelt/"
          icon="/svg/brand-instagram.svg"
          siteName="Instagram"
        />
        <SocialIcon
          href="https://www.twitter.com/grahamvanpelt"
          icon="/svg/brand-twitter.svg"
          siteName="Twitter"
        />
        <SocialIcon
          href="https://www.facebook.com/grahamvanpeltmusic"
          icon="/svg/brand-facebook.svg"
          siteName="Facebook"
        />
        <SocialIcon
          href="https://www.instagram.com/grahamvanpelt/"
          icon="/svg/brand-github.svg"
          siteName="Github"
        />
      </div>
    </header>
  )
}
