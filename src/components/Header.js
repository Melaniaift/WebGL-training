import Logo from "../assets/logo192.png"
import "./header.css"
import { Link, NavLink } from "react-router-dom"

export const Header = () => {
  return (
    <header>
      <Link to="/" className="logo">
        <img className="logo" src={Logo} alt="" />
        <span>WebGL Demo</span>
      </Link>

      <nav className="navigation">
        <Link to="/" className="link" end>Home</Link>
        <Link to="/objects" className="link">WebGL Objects</Link>
        <Link to="/products" className="link">Products</Link>
        <Link to="/contact" className="link">Contact</Link>
      </nav>
    </header>
  )
}
