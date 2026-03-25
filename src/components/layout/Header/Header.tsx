import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

import logoImg from '/assets/icons/logo-online-zoo.svg';
import youtubeIcon from '/assets/icons/icon-youtube.svg';
import instagramIcon from '/assets/icons/icon-instagram.svg';
import facebookIcon from '/assets/icons/icon-facebook.svg';

interface NavItem {
  label: string;
  path: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: 'About', path: '/' },
  { label: 'Map', path: '/map' },
  { label: 'Zoos', path: '#' },
  { label: 'Contact us', path: '/contact' },
  { label: 'Design', path: 'https://www.figma.com/design/lnK11foY8Aoa6oOlDXovVN/Online-ZOO-Project', external: true },
];

const socialLinks = [
  { icon: youtubeIcon, label: 'YouTube', href: '#' },
  { icon: instagramIcon, label: 'Instagram', href: '#' },
  { icon: facebookIcon, label: 'Facebook', href: '#' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} aria-label="Online Zoo home">
          <img className={styles.logoImg} src={logoImg} alt="Online Zoo" />
        </Link>

        <button
          className={`${styles.burger} ${isMenuOpen ? styles.burgerActive : ''}`}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>

        <nav
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
          aria-label="Primary"
        >
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.path}
                    className={styles.navLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                ) : item.path === '#' ? (
                  <a href="#" className={styles.navLink} onClick={closeMenu}>
                    {item.label}
                  </a>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                    }
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.rightSection}>
          <div className={styles.social} aria-label="Social links">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                className={styles.socialLink}
                href={social.href}
                aria-label={social.label}
              >
                <img className={styles.socialIcon} src={social.icon} alt="" />
              </a>
            ))}
          </div>
          {/* AuthUI will be added later */}
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </header>
  );
}

export default Header;
