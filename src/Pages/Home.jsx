import { useState, useRef, useEffect, useCallback } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import "../Style/Home.css";

const products = [
  { id: 21, name: 'Logo Cap', price: 25, category: 'extras', color: '#222222', img: '/public/products/Others/Cap.jpg' },
  { id: 22, name: 'Tote Bag', price: 20, category: 'extras', color: '#e8e8e5', img: '/public/products/Others/tote.jpg' },
  { id: 17, name: 'Fitted Long Sleeve', price: 35, category: 'women', color: '#333333', img: '/public/products/Women/fittedLongSleeve.jpg' },
  { id: 18, name: 'Knit Zip Pullover', price: 55, category: 'women', color: '#d4c4b0', img: '/public/products/Women/Knit Zip pullover.jpg' },
  { id: 1,  name: 'Faded Tee-shirt', price: 30, category: 'men', color: '#3a3a38', img: '/products/Men/fadedblackshirt.png' },
  { id: 5,  name: 'Black Cropped Tanktop', price: 30, category: 'men', color: '#222222', img: '/public/products/Men/BlackTanktop.png' },
  { id: 6,  name: 'Faded Hoodie', price: 50, category: 'men', color: '#1a1a1a', img: '/public/products/Men/FadedHoodie.png' },
  { id: 7,  name: 'Faded Grey Hoodie', price: 50, category: 'men', color: '#555555', img: '/public/products/Men/Greyhoodie.png' },
  { id: 19, name: 'Cashmere Cardigan', price: 55, category: 'women', color: '#d4c4b0', img: '/public/products/Women/CashmereCardigan.png' },
  { id: 20, name: 'Brown Top', price: 55, category: 'women', color: '#d4c4b0', img: '/public/products/Women/BrownTop.jpg' },
  { id: 2,  name: 'Faded Brown Tee', price: 30, category: 'men', color: '#8b6f5e', img: '/public/products/Men/FadedBrownShirt.png' },
  { id: 3,  name: 'Faded Blue Tee', price: 30, category: 'men', color: '#3a5f8a', img: '/public/products/Men/FadedBlueShirt.png' },
];

const visionItems = [
  { icon: "/VisionElements/feather.png", text: "Effortless fusion of high-end fashion and all-day comfort" },
  { icon: "/VisionElements/Diamond.png", text: "Premium fabrics that feel as good as they look" },
  { icon: "/VisionElements/Relax.png", text: "Designed for movement—whether you're grinding, relaxing, or arriving" },
  { icon: "/VisionElements/HeadTurn.png", text: "Silhouettes that turn heads without sacrificing wearability" },
  { icon: "/VisionElements/NoCompromises.png", text: "No compromises: style and comfort, together in every stitch" },
];

const CARD_WIDTH = 152;
const CARD_GAP   = 14;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP;

export default function HomePage() {
  /* ── Cart / Checkout ───────────────────────────────────────── */
  const [cartOpen,     setCartOpen]     = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartItems,    setCartItems]    = useState([]);

  const addToCart = (product) =>
    setCartItems(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });

  const removeFromCart = (id) => setCartItems(prev => prev.filter(i => i.id !== id));

  const handleCheckoutSuccess = () => {
    setCartItems([]);
    setCheckoutOpen(false);
  };

  /* ── Carousel ──────────────────────────────────────────────── */
  const outerRef = useRef(null);
  const [index, setIndex]         = useState(0);
  const [visible, setVisible]     = useState(5);

  useEffect(() => {
    const measure = () => {
      if (!outerRef.current) return;
      const w = outerRef.current.offsetWidth;
      const count = Math.max(1, Math.floor((w + CARD_GAP) / CARD_STRIDE));
      setVisible(count);
      setIndex(i => Math.min(i, Math.max(0, products.length - count)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, []);

  const maxIdx = Math.max(0, products.length - visible);
  const prev = useCallback(() => setIndex(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIndex(i => Math.min(maxIdx, i + 1)), [maxIdx]);

  return (
    <div className="arv-root">
      <Navbar
        cartCount={cartItems.reduce((s, i) => s + i.qty, 0)}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* HERO */}
      <section className="hero">
        <img src="/Home/Comfort Above All.png" alt="Comfort Above All" className="hero-img" />
        <div className="hero-overlay">
          <h1 className="hero-title">Comfort above<br />All else</h1>
          <button className="btn-dark hero-btn">Browse Now</button>
        </div>
      </section>

      {/* CREATED IN 2025 */}
      <section className="split-section">
        <div className="split-img-wrap">
          <img src="/Home/left.png" alt="Model Left" className="split-img" />
        </div>
        <div className="split-center">
          <h2 className="split-title">Created In<br />2025</h2>
        </div>
        <div className="split-img-wrap">
          <img src="/Home/Right.png" alt="Model Right" className="split-img" />
        </div>
      </section>

      {/* TRENDING PIECES */}
      <section className="trending">
        <div className="trending-header">
          <h2 className="section-title">Trending Pieces</h2>
          <button className="btn-outline">Browse Now</button>
        </div>

        <div className="carousel-wrapper">
          <button className="carousel-arrow" onClick={prev} disabled={index === 0} aria-label="Previous">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div className="carousel-track-outer" ref={outerRef}>
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${index * CARD_STRIDE}px)` }}
            >
              {products.map((p) => (
                <div className="product-card" key={p.id} onClick={() => addToCart(p)}>
                  <div className="product-img-wrap">
                    <img src={p.img} alt={p.name} className="product-img" />
                    <span className="product-add-hint">+ Add</span>
                  </div>
                  <p className="product-name">{p.name}</p>
                  <p className="product-price">${p.price}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-arrow" onClick={next} disabled={index >= maxIdx} aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        {maxIdx > 0 && (
          <div className="carousel-dots">
            {Array.from({ length: maxIdx + 1 }).map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === index ? ' active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* OUR MISSION */}
      <section className="mission">
        <div className="mission-img-wrap">
          <img src="/Home/ClothingRack.png" alt="Clothing Rack" className="mission-img" />
        </div>
        <div className="mission-content">
          <h2 className="section-title-lg">Our Mission</h2>
          <p className="body-text">
            At ARV Studios, We believe you shouldn't have to choose between looking good and feeling good.
            Our mission is to merge premium comfort with elevated design—creating clothing that moves with you,
            while turning heads along the way.
          </p>
          <button className="btn-outline">Learn More</button>
        </div>
      </section>

      {/* OUR VISION */}
      <section className="vision">
        <div className="vision-content">
          <h2 className="section-title-lg">Our Vision</h2>
          <ul className="vision-list">
            {visionItems.map((item, i) => (
              <li className="vision-item" key={i}>
                <img src={item.icon} alt="" className="vision-icon" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <button className="btn-outline">Learn More</button>
        </div>
        <div className="vision-img-wrap">
          <img src="/Home/HoodBig.png" alt="Hoodie" className="vision-img" />
        </div>
      </section>

      <Footer />

      {/* CART DRAWER */}
      {cartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
        />
      )}

      {/* CHECKOUT DRAWER */}
      {checkoutOpen && (
        <Checkout
          items={cartItems}
          onClose={() => setCheckoutOpen(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}
    </div>
  );
}