import Footer from './Footer'
import Navbar from './Navbar'

export default function PageShell({ children }) {
  return <><Navbar /><main className="container">{children}</main><Footer /></>
}
