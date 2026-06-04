import { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialLinks = [
    { name: "Instagram", icon: "📸", url: "https://instagram.com", color: "#E4405F" },
    { name: "Facebook", icon: "f", url: "https://facebook.com", color: "#1877F2" },
    { name: "Twitter", icon: "𝕏", url: "https://twitter.com", color: "#000000" },
  ];

  return (
    <footer className="footer-container">
      <div className="footer-glow"></div>
      
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-brand-section">
          <div className="footer-brand-header">
            <div className="footer-logo">
              <span className="logo-badge">Go</span>
              <div>
                <h3 className="brand-name">GoCart</h3>
                <p className="brand-tagline">Modern marketplace for everyone</p>
              </div>
            </div>
          </div>
          
          <p className="brand-description">
            The modern marketplace built for fast shopping and smart discovery. Shop smarter, save more.
          </p>

          {/* Statistics Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <span className="stat-number">100k+</span>
                <span className="stat-label">Products</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏪</div>
              <div className="stat-content">
                <span className="stat-number">50k+</span>
                <span className="stat-label">Sellers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Section */}
        <div className="footer-section">
          <h4 className="footer-section-title">Company</h4>
          <ul className="footer-links">
            <li><a href="#about" className="footer-link">About us</a></li>
            <li><a href="#careers" className="footer-link">Careers</a></li>
            <li><a href="#press" className="footer-link">Press</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h4 className="footer-section-title">Support</h4>
          <ul className="footer-links">
            <li><a href="#help" className="footer-link">Help center</a></li>
            <li><Link to="/contact" className="footer-link">Contact us</Link></li>
            <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Section */}
        <div className="footer-section">
          <h4 className="footer-section-title">Follow Us</h4>
          <div className="social-icons-container">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title={social.name}
                onMouseEnter={() => setHoveredSocial(social.name)}
                onMouseLeave={() => setHoveredSocial(null)}
                aria-label={`Follow us on ${social.name}`}
              >
                <span className="social-icon-inner">{social.icon}</span>
                {hoveredSocial === social.name && <span className="social-tooltip">{social.name}</span>}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="footer-divider-line"></div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p className="footer-copyright">
            © {new Date().getFullYear()} GoCart. Built for a better shopping experience.
          </p>
        </div>
        <div className="footer-bottom-right">
          <a href="#terms" className="footer-bottom-link">Terms of Service</a>
          <span className="footer-divider-dot">•</span>
          <a href="#privacy" className="footer-bottom-link">Privacy Policy</a>
          <span className="footer-divider-dot">•</span>
          <a href="#cookies" className="footer-bottom-link">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
