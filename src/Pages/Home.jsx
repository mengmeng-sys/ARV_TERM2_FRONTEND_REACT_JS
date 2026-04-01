import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../Style/Home.css";

const products = [
  { name: "Faded Tee-shirt", price: "30$", img: "/products/Men/fadedblackshirt.png" },
  { name: "Faded Hoodie", price: "50$", img: "/products/Men/FadedHoodie.png" },
  { name: "Faded Tee-shirt", price: "30$", img: "/products/Men/FadedBrownShirt.png" },
  { name: "Faded Tee-shirt", price: "30$", img: "/products/Men/fadedblackshirt.png" },
  { name: "Faded Tee-shirt", price: "30$", img: "/products/Men/FadedHoodie.png" },
  { name: "Faded Tee-shirt", price: "30$", img: "/products/Men/FadedBrownShirt.png" },
];

const visionItems = [
  { icon: "/VisionElements/feather.png", text: "Effortless fusion of high-end fashion and all-day comfort" },
  { icon: "/VisionElements/Diamond.png", text: "Premium fabrics that feel as good as they look" },
  { icon: "/VisionElements/Relax.png", text: "Designed for movement—whether you're grinding, relaxing, or arriving" },
  { icon: "/VisionElements/HeadTurn.png", text: "Silhouettes that turn heads without sacrificing wearability" },
  { icon: "/VisionElements/NoCompromises.png", text: "No compromises: style and comfort, together in every stitch" },
];

export default function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const visibleCount = 5;
  const maxIndex = products.length - visibleCount;

  const prev = () => setCarouselIndex((i) => Math.max(0, i - 1));
  const next = () => setCarouselIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <div className="arv-root">
      <Navbar cartCount={0} onCartOpen={() => {}} />

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
          <button className="carousel-arrow" onClick={prev} disabled={carouselIndex === 0}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="carousel-track-outer">
            <div className="carousel-track" style={{ transform: `translateX(-${carouselIndex * (152 + 14)}px)` }}>
              {products.map((p, i) => (
                <div className="product-card" key={i}>
                  <div className="product-img-wrap">
                    <img src={p.img} alt={p.name} className="product-img" />
                  </div>
                  <p className="product-name">{p.name}</p>
                  <p className="product-price">{p.price}</p>
                </div>
              ))}
            </div>
          </div>
          <button className="carousel-arrow" onClick={next} disabled={carouselIndex >= maxIndex}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="mission">
        <div className="mission-img-wrap">
          <img src="/Home/ClothingRack.png" alt="Clothing Rack" className="mission-img" />
        </div>
        <div className="mission-content">
          <h2 className="section-title-lg">Our Mission</h2>
          <p className="body-text">
            At ARV Studios, We believe you shouldn't have to choose between looking good and feeling good. Our mission is to merge premium comfort with elevated design—creating clothing that moves with you, while turning heads along the way.
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
    </div>
  );
}
