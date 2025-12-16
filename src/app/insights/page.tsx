import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Insights - Bryane Autos',
};

export default function InsightsPage() {
    return (
        <>
            <section className="hero section" style={{ minHeight: '60vh' }}>
                <div className="hero-media">
                    <Image src="/car2.jpg" alt="Car hero image" fill style={{ objectFit: 'cover' }} priority />
                    <div className="gradient-overlay"></div>
                </div>
                <div className="hero-content container">
                    <h1>Learn, Compare, Choose — Make Smarter Car Decisions</h1>
                    <p>From buying to renting, Bryane Autos guides you through everything you need to know about cars — maintenance, cost, safety, and performance.</p>
                </div>
            </section>

            <section className="section container">
                <div className="section-header">
                    <h2>Our Insights</h2>
                    <p>Valuable knowledge for car lovers, buyers, and renters.</p>
                </div>

                <div className="insight-grid">
                    {/* Insight Cards */}
                    <InsightCard
                        title="Why Service History Matters"
                        desc="Always check a car’s service records. Proper maintenance ensures reliability, safety, and protects your investment."
                        img="/car1.jpg"
                    />
                    <InsightCard
                        title="How to Inspect a Car Like a Pro"
                        desc="Inspect tires, suspension, fluids, and electronics to avoid hidden problems before buying or renting."
                        img="/car2.jpg"
                    />
                    <InsightCard
                        title="Choosing the Right Car for You"
                        desc="Consider your lifestyle, commute, family needs, and cargo space to make the best choice."
                        img="/car1.jpg"
                    />
                    <InsightCard
                        title="Understanding Features & Specs"
                        desc="Focus on safety, fuel efficiency, and essential comfort features. Luxury interiors are great, but consider maintenance costs."
                        img="/car2.jpg"
                    />
                    <InsightCard
                        title="Know the True Cost of Your Car"
                        desc="Beyond price: maintenance, insurance, fuel, and resale value all affect the real cost."
                        img="/car1.jpg"
                    />
                    <InsightCard
                        title="Customer Stories & Lessons Learned"
                        desc="Learn from experiences of real car owners and renters — mistakes, successes, and tips."
                        img="/car2.jpg"
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="footer-cta" style={{ marginBottom: 0, borderRadius: 0 }}>
                <div className="container cta-flex">
                    <div>
                        <h2>Ready to Find Your Car?</h2>
                        <p>Browse our inventory with confidence and make an informed choice today!</p>
                    </div>
                    <div className="cta-actions">
                        <Link href="/cars" className="btn btn-primary btn-lg">Browse Cars</Link>
                        <Link href="/booking" className="btn btn-ghost btn-lg" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>Book Now</Link>
                    </div>
                </div>
            </section>
        </>
    );
}

function InsightCard({ title, desc, img }: any) {
    return (
        <div className="card insight">
            {/* Fallback to car1.jpg if img missing */}
            <div style={{ height: '200px', position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                <Image src={img} alt={title} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="content">
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link href="#" className="link">Learn More</Link>
            </div>
        </div>
    );
}
