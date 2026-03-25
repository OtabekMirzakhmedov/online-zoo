import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

import logoZoo from '/assets/icons/logo-online-zoo.svg';
import logoYem from '/assets/icons/logo-yem-digital.svg';
import logoRs from '/assets/icons/logo-rs-school.svg';
import youtubeIcon from '/assets/icons/icon-youtube.svg';
import instagramIcon from '/assets/icons/icon-instagram.svg';
import facebookIcon from '/assets/icons/icon-facebook.svg';

const navLinks = [
  { label: 'About', path: '/' },
  { label: 'Map', path: '/map' },
  { label: 'Zoos', path: '/animal' },
  { label: 'Contact us', path: '/contact' },
];

const socialLinks = [
  { icon: youtubeIcon, label: 'YouTube', href: '#' },
  { icon: instagramIcon, label: 'Instagram', href: '#' },
  { icon: facebookIcon, label: 'Facebook', href: '#' },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brands}>
            <Link to="/" className={styles.brandLink} aria-label="Online Zoo home">
              <img
                className={`${styles.brandLogo} ${styles.brandLogoZoo}`}
                src={logoZoo}
                alt="Online Zoo"
              />
            </Link>
            <a href="#" className={styles.brandLink} aria-label="Yem Digital">
              <img
                className={`${styles.brandLogo} ${styles.brandLogoYem}`}
                src={logoYem}
                alt="Yem Digital"
              />
            </a>
            <a href="#" className={styles.brandLink} aria-label="RS School">
              <img
                className={`${styles.brandLogo} ${styles.brandLogoRs}`}
                src={logoRs}
                alt="RS School"
              />
            </a>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#" className={styles.donate}>
            Donate for volunteers
            <span className={styles.donateIcon} aria-hidden="true"></span>
          </a>
        </div>

        <div className={styles.divider} aria-hidden="true"></div>

        <div className={styles.bottom}>
          <div className={styles.copyrights}>
            <span className={styles.copyright}>&copy; 2021 DinaK</span>
            <span className={styles.copyright}>&copy; Yem Digital</span>
            <span className={styles.copyright}>&copy; RSSchool</span>
          </div>
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
