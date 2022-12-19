import SocialIcon from "../elements/SocialIcon"
import SocialIconsGrid from "../elements/SocialIconsGrid"

export default function Header() {
  return (
    <header>
      <img
        className="headshot"
        src="/gvp_blurry.jpg"
        alt="photo of Graham Van Pelt"
      ></img>
      <img
        className="logo"
        src="/gvp-at-namecrop.jpg"
        alt="Graham Van Pelt"
      ></img>
      <SocialIconsGrid />
    </header>
  )
}
