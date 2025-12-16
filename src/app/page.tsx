import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <Image
            src="/hero.jpg"
            alt="Premium cars"
            fill
            style={{ objectFit: 'cover', filter: 'brightness(.55)' }}
            priority
          />
          <div className="gradient-overlay"></div>
        </div>

        <div className="hero-content container">
          <div className="hero-eyebrow">Premium Car Hire • Accra & Across Ghana</div>
          <h1>Drive in Comfort. Arrive in Style.</h1>
          <p className="lead">Premium vehicles, transparent pricing, instant confirmation — built for executives, families & special occasions.</p>

          <form className="hero-search" action="/cars" method="get">
            <select name="location" defaultValue="Pick-up">
              <option disabled>Pick-up</option>
              <option value="Accra">Accra</option>
              <option value="Airport">Airport</option>
              <option value="Kumasi">Kumasi</option>
            </select>
            <input type="date" name="start" required />
            <input type="date" name="end" required />
            <select name="vehicle" defaultValue="Vehicle Type">
              <option disabled>Vehicle Type</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
              <option value="Bus">Bus</option>
            </select>
            <button type="submit" className="btn btn-primary">Find Cars</button>
          </form>

          <div className="hero-features">
            <div><h4>Transparent Pricing</h4><p>No hidden fees</p></div>
            <div><h4>Well Maintained Fleet</h4><p>Top condition always</p></div>
            <div><h4>24/7 Support</h4><p>Airport & local delivery</p></div>
          </div>

          <ul className="trust-badges">
            <li>Free Cancellation</li>
            <li>No Hidden Fees</li>
            <li>Airport Delivery</li>
          </ul>
        </div>
      </section>

      <section className="pre-footer" id="preFooter">
        <div className="container">

          {/* TRUST STRIP */}
          <div className="trust-strip">
            <div>
              <h3>8+</h3>
              <p>Years of Excellence</p>
            </div>
            <div>
              <h3>120+</h3>
              <p>Premium Vehicles</p>
            </div>
            <div>
              <h3>2,000+</h3>
              <p>Successful Bookings</p>
            </div>
            <div>
              <h3>24/7</h3>
              <p>Client Support</p>
            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="why-us">
            <h2>Why Choose Bryane Autos</h2>
            <div className="why-grid">
              <div className="why-card">✅ Fully Insured Fleet</div>
              <div className="why-card">✅ Chauffeur & Self-Drive Options</div>
              <div className="why-card">✅ Executive-Level Maintenance</div>
              <div className="why-card">✅ Transparent Pricing</div>
            </div>
          </div>

          {/* FINAL CTA */}
          <div className="final-cta">
            <h2>Ready for a First-Class Driving Experience?</h2>
            <p>Secure your vehicle in minutes. Our fleet is always in demand.</p>
            <div className="cta-buttons">
              <Link href="/booking" className="btn btn-primary">Reserve Now</Link>
              <Link href="/contact" className="btn btn-ghost">Speak to an Executive</Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
