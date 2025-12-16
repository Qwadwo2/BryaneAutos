import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="site-footer-advanced">
            {/* CTA STRIP */}
            <div className="footer-cta">
                <div className="container cta-flex">
                    <div>
                        <h2>Ready to Book Your Ride?</h2>
                        <p>Fast confirmation. No hidden fees. Trusted fleet across Ghana.</p>
                    </div>
                    <div className="cta-actions">
                        <Link href="/booking" className="btn btn-primary">Book Now</Link>
                        <a href="https://wa.me/233257043698" className="btn btn-ghost" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.12)', color: '#fff' }}>Chat on WhatsApp</a>
                    </div>
                </div>
            </div>

            {/* MAIN FOOTER */}
            <div className="container footer-grid-advanced">

                {/* BRAND */}
                <div>
                    <Image src="/logo.png" alt="Bryane Autos" width={72} height={72} style={{ width: '72px', height: 'auto', marginBottom: '.6rem', display: 'block' }} />
                    <p className="footer-text">Bryane Autos is a premium car rental service delivering comfort, reliability, and executive-class mobility across Ghana.</p>

                    <div className="social">
                        <a href="https://www.instagram.com/bryane_autos" aria-label="Instagram">
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.2" fill="none" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" fill="none" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>
                        </a>
                        <a href="https://www.facebook.com/bryane_autos" aria-label="Facebook">
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a4 4 0 00-4 4v3H8v3h3v7h3v-7h2.5l.5-3H14V6a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                        </a>
                        <a href="#" aria-label="X (Twitter)">
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016 3a4.5 4.5 0 00-4.47 5.53A12.94 12.94 0 013 4s-4 9 5 13a13 13 0 01-8 2c9 5 20 0 20-11.5a4.5 4.5 0 001-2.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                        </a>
                    </div>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h4>Company</h4>
                    <ul>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/cars">Our Fleet</Link></li>
                        <li><Link href="/insights">Insights</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* SERVICES */}
                <div>
                    <h4>Services</h4>
                    <ul>
                        <li><Link href="#">Airport Transfers</Link></li>
                        <li><Link href="#">Executive Rentals</Link></li>
                        <li><Link href="#">Wedding & Events</Link></li>
                        <li><Link href="#">Long-Term Leasing</Link></li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                    <h4>Contact</h4>
                    <p style={{ margin: '0 0 6px', color: 'rgba(255,255,255,.9)' }}>📍 Accra, Ghana</p>
                    <p style={{ margin: '0 0 6px', color: 'rgba(255,255,255,.9)' }}>📞 <a href="tel:+233509875967" style={{ color: 'inherit', textDecoration: 'none' }}>+233 50 987 5967</a></p>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,.9)' }}>✉️ <a href="mailto:support@bryaneautos.com" style={{ color: 'inherit', textDecoration: 'underline' }}>support@bryaneautos.com</a></p>
                    <p style={{ marginTop: '12px', fontWeight: 600, color: '#fff' }}>Working Hours</p>
                    <p style={{ margin: '6px 0 0', color: 'rgba(255,255,255,.9)' }}>Mon – Sun: 24 Hours</p>
                </div>

            </div>

            {/* LEGAL */}
            <div className="footer-legal">
                © <span id="year">{new Date().getFullYear()}</span> Bryane Autos. All rights reserved.
            </div>
        </footer>
    );
}
