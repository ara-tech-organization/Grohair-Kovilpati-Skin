import logo from '../assets/logo-trim.png'
import { BRANCHES, CLINIC } from '../data'
import { useReveal } from '../hooks'
import CallLink from './CallLink'
import Icon from './Icon'

const LINKS = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Reviews', href: '#reviews' },
]

export default function Footer() {
  const ref = useReveal()

  return (
    <footer className="ftr" ref={ref}>
      <div className="shell">
        <div className="ftr__top">
          <div className="ftr__brand reveal">
            <img src={logo} alt={CLINIC.name} width="164" height="84" loading="lazy" />
            <p>
              Kovilpatti&apos;s trusted skin and hair clinic — 15+ years of experience, 10,000+
              patients treated.
            </p>
            <div className="ftr__contact">
              {/* A real tel:, matching the mailto below — the number is the
                  contact detail here, so it has to behave like one. */}
              <CallLink className="ftr__phone">
                <Icon name="Phone" size={19} />
                {CLINIC.phoneDisplay}
              </CallLink>

              {/* A real mailto rather than plain text — an address someone has
                  to retype by hand is an address they do not write to. */}
              <a className="ftr__mail" href={`mailto:${CLINIC.email}`}>
                <Icon name="Mail" size={17} />
                {CLINIC.email}
              </a>
            </div>

            <div className="ftr__social">
              <a href={CLINIC.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.7c0-.9.3-1.5 1.5-1.5h1.6V4.5c-.3 0-1.200-.1-2.300-.1-2.300 0-3.900 1.400-3.900 4v2.100H7.800v3h2.600V21h3.100z" />
                </svg>
              </a>
              <a href={CLINIC.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          <div className="ftr__branches reveal" style={{ '--delay': '80ms' }}>
            <h3 className="ftr__h">Our Kovilpatti Clinic</h3>
            <div className="ftr__branch-grid">
              {BRANCHES.map((branch) => (
                <div key={branch.id} className="ftr__branch">
                  <strong>
                    <Icon name="MapPin" size={16} />
                    {branch.name}
                  </strong>
                  <address>
                    {branch.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                  <div className="ftr__branch-map">
                    <iframe
                      src={branch.embed}
                      title={`${branch.name} clinic location on Google Maps`}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <nav className="ftr__links reveal" style={{ '--delay': '140ms' }} aria-label="Quick links">
            <h3 className="ftr__h">Quick Links</h3>
            <ul>
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>
                    <Icon name="ArrowRight" size={14} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="ftr__legal">
          <small>© {new Date().getFullYear()} {CLINIC.name}. All rights reserved.</small>
          <small className="ftr__credit">
            <Icon name="Heart" size={14} fill="currentColor" className="ftr__credit-heart" />
            Crafted by
            <a href="https://discovertechnologies.co/" target="_blank" rel="noopener noreferrer">
              ARA Discover Technology
            </a>
          </small>
        </div>
      </div>
    </footer>
  )
}
