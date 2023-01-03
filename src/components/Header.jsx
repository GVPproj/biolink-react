import SocialIconsGrid from "../elements/SocialIconsGrid"

export default function Header() {
  return (
    <header>
      <img
        className="headshot"
        src="/gvp_blurry.webp"
        alt="photo of Graham Van Pelt"
      ></img>
      <img
        className="logo"
        src="/gvp-at-namecrop.webp"
        alt="Graham Van Pelt text"
      ></img>
      <SocialIconsGrid />
    </header>
  )
}
