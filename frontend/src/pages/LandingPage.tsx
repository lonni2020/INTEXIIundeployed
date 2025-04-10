import HeaderNotSignedIn from "../components/HeaderNotSignedIn";
import Footer from "../components/Footer";
import "../styles/LandingPage.css";
import { useEffect, useState } from "react";
import { Movie } from "../types/Movies";
import { fetchTrendingMovies } from "../api/MovieAPI";
import { getCookieConsentValue } from "react-cookie-consent";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Retrieve top ten most trending movies
    fetchTrendingMovies()
      .then((data) => setTrendingMovies(data))
      .catch((err) => console.error("Failed to load trending movies:", err));
  
    // Check cookie consent and set a test cookie
    if (getCookieConsentValue("cineNicheUserConsent") === "true") {
      document.cookie = "cineNicheTest=true; path=/";
      console.log("Test cookie set.");
    }
  }, []);
  
  return (
    <>
      <HeaderNotSignedIn />

      <div className="login-background">
        <div className="login-overlay d-flex flex-column justify-content-center align-items-center text-center text-light px-3">
          <h1 className="fw-bold display-4 mb-3">DISCOVER THE FILMS</h1>
          <h1 className="fw-bold display-4 mb-4">OTHERS MISSED.</h1>
          <p className="lead mb-4 fs-4 text-light">Stream anywhere, anytime.</p>
          <a
            href="/create-account"
            className="btn btn-secondary btn-lg fw-bold px-5 py-2"
          >
            GET STARTED
          </a>
        </div>
      </div>
      <div className="description-section">

  {/* Site Description */}
  <div className="description-section">
    <h2 className="description-title">Beyond the Mainstream</h2>
    <p className="description-subtitle">
    CineNiche delivers curated cinema for true film lovers — from cult classics and indie gems to global treasures and niche documentaries rarely seen elsewhere. Available now on all major devices.
    </p>

    {/* Movie example images */}
    <div className="category-highlights">
      <div className="highlight-card bg-cult-favorites">
        <div className="card-overlay">
          <h5 className="highlight-subtitle">Cult Favorites</h5>
          <h3 className="highlight-title">Classics & Underground</h3>
        </div>
      </div>

      <div className="highlight-card bg-global-stories">
        <div className="card-overlay">
          <h5 className="highlight-subtitle">Global Stories</h5>
          <h3 className="highlight-title">International Cinema</h3>
        </div>
      </div>

      <div className="highlight-card bg-unfiltered-truth">
        <div className="card-overlay">
          <h5 className="highlight-subtitle">Unfiltered Truth</h5>
          <h3 className="highlight-title">Niche Documentaries</h3>
        </div>
      </div>

      <div className="highlight-card bg-indie-films">
        <div className="card-overlay">
          <h5 className="highlight-subtitle">Breakthroughs</h5>
          <h3 className="highlight-title">Indie Films</h3>
        </div>
      </div>
    </div>
  </div>
</div>

  {/* Trending Now section */}
  <div className="trending-section">
    <h2 className="trending-title">Trending with Our Viewers:</h2>
    <div className="trending-carousel">
      {trendingMovies.map((movie, index) => (
        <div className="trending-card" key={movie.showId}>
          <span className="trending-rank">{index + 1}</span>
          <img
            src={movie.posterUrl || "/images/Placeholder.jpg"}
            alt={movie.title}
            className="trending-img"
          />
        </div>
      ))}
    </div>
  </div>
      <Footer />
    </>
  );
}

export default HomePage;
