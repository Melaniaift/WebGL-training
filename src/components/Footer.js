import "./footer.css"

export const Footer = () => {

  const year = new Date().getFullYear();
  const username = "Melania";
  return (
    <footer>
      {year} @{username}
    </footer>
  )
}
