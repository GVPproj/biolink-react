export default function Footer() {
  let year = new Date().getFullYear()

  return (
    <footer>
      <p>© {year} Graham Van Pelt</p>
      <p>
        Logo text by{" "}
        <a href="https://elihorn.ca/" target="_blank">
          Eli Horn
        </a>
      </p>
    </footer>
  )
}
