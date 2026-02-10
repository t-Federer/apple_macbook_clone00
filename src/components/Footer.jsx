import { footerLinks } from "../constants"

const Footer = () => {
        return (
                <footer id="footer">
                        <div className="info">
                                <p>More ways to shop: Find an Apple Store or other retailer near you. Or call 000800 040 1966.</p>
                                <img src="/logo.svg" alt ="Apple logo"/>
                        </div>

                        <hr />

                        <div className="links">
                                <p>Copyright © 2026 Apple Inc. All rights reserverd.</p>
                                <ul>
                                        {footerLinks.map(({label, link}) => (
                                                <li key={label}>
                                                        <a href={link}>{label}</a>
                                                </li>
                                        ))}
                                </ul>
                        </div>
                </footer>
        )
}

export default Footer