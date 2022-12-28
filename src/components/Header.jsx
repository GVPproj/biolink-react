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
      <p>
        Hi! I'm releasing a new ambient LP entitled{" "}
        <strong>'Atlantis Tapes'</strong> on February 22, 2023! The first single
        will be out January 12th. Stay tuned 😌
      </p>
    </header>
  )
}
