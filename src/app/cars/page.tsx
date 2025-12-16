'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// ========== CAR MENU ==========
const baseCars = [
    { name: 'Toyota Corolla', class: 'economy', price: 350, img: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&auto=format&fit=crop', specs: ['Auto', '5 seats', 'Petrol'] },
    { name: 'Hyundai Accent', class: 'economy', price: 300, img: 'https://hips.hearstapps.com/hmg-prod/images/2022-hyundai-accent-mmp-1-1634756931.jpg?resize=2048:*', specs: ['Manual', '5 seats', 'Aircon'] },
    { name: 'Mercedes-Benz C300', class: 'executive', price: 1200, img: 'https://images.unsplash.com/photo-1630596369706-57eaf9ba7cae?w=1200&auto=format&fit=crop', specs: ['Auto', 'Leather', 'Wi-Fi'] },
    { name: 'BMW 5 Series', class: 'executive', price: 1500, img: 'https://www.topgear.com/sites/default/files/2024/04/TopGear%20-%20First%20Drive%20-%20BMW%205%20Series%202024-031.jpg?w=1200&auto=format&fit=crop', specs: ['Auto', 'Luxury', 'Premium Sound'] },
    { name: 'Toyota Fortuner', class: 'suv', price: 1000, img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&auto=format&fit=crop', specs: ['4x4', '7 seats'] },
    { name: 'Nissan Patrol V8', class: 'suv', price: 1300, img: 'https://assets.autobuzz.my/wp-content/uploads/2024/09/04154801/All-new-Nissan-Patrol.jpg?w=1200&auto=format&fit=crop', specs: ['V8', 'Luxury SUV'] }
];

// Expand to 54 cars
const ALL_CARS = Array.from({ length: 54 }, (_, i) => {
    const base = baseCars[i % baseCars.length];
    return {
        id: `${base.class}-${i + 1}`,
        name: `${base.name} ${i + 1}`,
        type: base.class,
        pricePerDay: base.price,
        img: base.img,
        specs: base.specs
    };
});

const BATCH = 6;

export default function CarsPage() {
    const router = useRouter();
    const [displayedCars, setDisplayedCars] = useState<any[]>([]);
    const [filteredCars, setFilteredCars] = useState<any[]>(ALL_CARS);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClass, setFilterClass] = useState('all');
    const [sortOrder, setSortOrder] = useState('featured');
    const [index, setIndex] = useState(0);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const [selectedCar, setSelectedCar] = useState<any>(null);

    // Apply filters
    useEffect(() => {
        let result = ALL_CARS.filter(car => {
            if (filterClass !== 'all' && car.type !== filterClass) return false;
            return car.name.toLowerCase().includes(searchTerm.toLowerCase());
        });

        if (sortOrder === 'price-asc') result.sort((a, b) => a.pricePerDay - b.pricePerDay);
        if (sortOrder === 'price-desc') result.sort((a, b) => b.pricePerDay - a.pricePerDay);
        if (sortOrder === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name));

        setFilteredCars(result);
        setIndex(0);
    }, [searchTerm, filterClass, sortOrder]);

    // Load batch
    useEffect(() => {
        const nextBatch = filteredCars.slice(0, index + BATCH);
        setDisplayedCars(nextBatch);
    }, [index, filteredCars]);

    // Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && index < filteredCars.length) {
                setIndex(prev => prev + BATCH);
            }
        }, { rootMargin: '300px' });

        if (sentinelRef.current) observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [filteredCars.length, index]);

    const reserveCar = (car: any) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedCar', car.name);
            localStorage.setItem('selectedCarId', car.id);
        }
        router.push('/booking');
    };

    return (
        <div className="container" style={{ minHeight: '80vh' }}>
            <section className="showroom-hero">
                <h1 style={{ margin: '0 0 .25rem' }}>Our Fleet — Executive Showroom</h1>
                <p className="small-muted" style={{ margin: '0 0 .8rem' }}>Quietly curated. Carefully maintained. Scroll to explore our vehicles.</p>

                <div className="controls" role="region" aria-label="Car controls">
                    <input
                        className="search"
                        type="search"
                        placeholder="Search by model, e.g., 'Corolla', 'V8', 'Fortuner'"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        aria-label="Filter by class"
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                    >
                        <option value="all">All classes</option>
                        <option value="economy">Economy</option>
                        <option value="executive">Executive</option>
                        <option value="suv">SUV</option>
                    </select>
                    <select
                        aria-label="Sort by"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price — low to high</option>
                        <option value="price-desc">Price — high to low</option>
                        <option value="name-asc">Name A–Z</option>
                    </select>
                    <div className="small-muted" aria-live="polite">
                        {filteredCars.length} vehicles
                    </div>
                </div>

                <div id="showroomGrid">
                    {displayedCars.map((car, i) => (
                        <CarCard key={car.id} car={car} onReserve={reserveCar} onDetails={setSelectedCar} index={i} />
                    ))}
                </div>
                <div ref={sentinelRef} className="sentinel" aria-hidden="true" style={{ height: '50px' }}></div>
            </section>

            {/* Modal */}
            {selectedCar && (
                <div className="modal-backdrop" onClick={(e) => {
                    if (e.target === e.currentTarget) setSelectedCar(null);
                }}>
                    <div className="modal">
                        <h3>{selectedCar.name}</h3>
                        {/* Using img tag because external URL */}
                        <img src={selectedCar.img} alt={selectedCar.name} style={{ width: '100%', borderRadius: '12px', maxHeight: '300px', objectFit: 'cover' }} />
                        <p style={{ marginTop: '10px' }}>{selectedCar.specs.join(' • ')}</p>
                        <p><strong>GHS {selectedCar.pricePerDay}/day</strong></p>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                            <button className="btn btn-primary" onClick={() => reserveCar(selectedCar)}>Reserve</button>
                            <button className="btn btn-ghost" onClick={() => setSelectedCar(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function CarCard({ car, onReserve, onDetails }: any) {
    const [revealed, setRevealed] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setRevealed(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <article className={`card showroom-card ${revealed ? 'revealed' : ''}`}>
            <div className="showroom-media">
                <img src={car.img} alt={car.name} loading="lazy" />
            </div>
            <div className="card-body">
                <div className="car-meta">
                    <div>
                        <h3>{car.name}</h3>
                        <div className="car-specs">{car.specs.map((s: string) => <span key={s} style={{ marginRight: '6px' }}>{s}</span>)}</div>
                    </div>
                    <div>
                        <strong>GHS {car.pricePerDay}/day</strong>
                        <div className="small-muted">{car.type.toUpperCase()}</div>
                    </div>
                </div>
                <div style={{ marginTop: '.7rem', display: 'flex', gap: '.5rem' }}>
                    <button className="btn btn-ghost small" onClick={() => onDetails(car)}>Details</button>
                    <button className="btn btn-primary small" onClick={() => onReserve(car)}>Reserve</button>
                </div>
            </div>
        </article>
    );
}
