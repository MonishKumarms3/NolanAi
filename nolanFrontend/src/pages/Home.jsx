import { Link } from "react-router-dom";
import "./Home.css";
import stan from '../assets/stan.mp4';
function Home() {
  return (
    <>
    <main className="home">
        <section className="hero">
            <div className="hero-text">
                <h1>Bring your film project to life from <span>idea</span> to <span>production</span></h1>
                <button className="cta-btn">Start Creating</button>
            </div>
            <div className="hero-video">
                <video controls>
                    <source src={stan} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
        <section className="info-section">
            <h2>NolanAI is a collaborative film production suite</h2>
            <p>covering the full film production process from concept creation and screenwriting to planning and stage production</p>
            <div className="info-content">
                <div className="info-video">
                    <video controls>
                        <source src={stan} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="info-text">
                    <h3><span>AI</span> Video Generator</h3>
                    <p>Transform your scripts into cinematic visuals with our AI video generator.</p>
                    <p>Sign up now to be among the first to access it!</p>
                    <button className="cta-btn">Start Creating</button>
                </div>
            </div>
        </section>
        <section className="features-section">
            <div className="top-row">
                <div className="feature">
                    <div className="icon-circle">
                        <i className="icon">✏️</i>
                    </div>
                    <h3>AI Co-Pilot Editor</h3>
                    <p>Overcome writer's block with AI-driven prompts and suggestions, ensuring a seamless writing flow.</p>
                </div>
                
                <div className="feature">
                    <div className="icon-circle">
                        <i className="icon">📊</i>
                    </div>
                    <h3>AI Pitch Deck</h3>
                    <p>Create compelling pitch decks effortlessly with ready-made templates. NolanAI extracts crucial details to suggest casts and visualize your story.</p>
                </div>
                
                <div className="feature">
                    <div className="icon-circle">
                        <i className="icon">🌐</i>
                    </div>
                    <h3>Multilingual</h3>
                    <p>Work seamlessly in Spanish, French, Portuguese, or Russian - no language barriers to hold back your projects.</p>
                </div>
            </div>

            <div className="bottom-row">
                <div className="feature">
                    <div className="icon-circle">
                        <i className="icon">📈</i>
                    </div>
                    <h3>Analytics</h3>
                    <p>Instantly identify plot holes and receive thorough script coverage analysis. Perfect your screenplay with targeted insights and scores.</p>
                </div>
                
                <div className="feature">
                    <div className="icon-circle">
                        <i className="icon">📋</i>
                    </div>
                    <h3>Automated Breakdown</h3>
                    <p>Streamline pre-production with automatic breakdowns that quickly organize script elements for efficient planning.</p>
                </div>
            </div>
        </section>
      <div className="signup">
          <button className="cta-btn">Sign Up For Free</button>
      </div>
      <section className="action-section">
        <div className="content-wrapper">
            <div className="text-content">
                <h1>NolanAI in Action</h1>
                <h2>Meet Bryce</h2>
                
                <p className="description">
                    An independent filmmaker who is utilizing the full power of NolanAI to break down scripts, create pitch decks and storyboards, and reach his ultimate goal.
                </p>
                
                <p className="sub-description">
                    With its AI-powered features and user-friendly interface, it can help you bring your stories to life in the most efficient and effective way possible, while respecting your unique creative voice.
                </p>

                <button className="premium-btn">
                    View premium plans
                    <span className="arrow">→</span>
                </button>
            </div>

            <div className="video-container">
                <video controls>
                    <source src={stan} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    </section>
    <section className="stats-section">
        <h2>Skyrocket your productivity</h2>
        
        <div className="stats-container">
            <div className="stat-item">
                <div className="icon-circle">
                    <svg className="icon" viewBox="0 0 24 24">
                        <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 5.28c-1.23-.37-2.22-1.17-2.8-2.18l-1-1.6c-.41-.65-1.11-1-1.84-1-.78 0-1.59.5-1.78 1.44S7 23 7 23" fill="#ff9800"/>
                    </svg>
                </div>
                <h3>90% faster</h3>
                <p>Speed Through Project Completion</p>
            </div>

            <div className="stat-item">
                <div className="icon-circle">
                    <svg className="icon" viewBox="0 0 24 24">
                        <path d="M12.5 6.9c-2.65 0-5 2.35-5 5s2.35 5 5 5 5-2.35 5-5-2.35-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" fill="#ff9800"/>
                    </svg>
                </div>
                <h3>80% Lower Costs</h3>
                <p>Halve Your Expenses</p>
            </div>

            <div className="stat-item">
                <div className="icon-circle">
                    <svg className="icon" viewBox="0 0 24 24">
                        <path d="M7 2v11h3v9l7-12h-4l4-8z" fill="#ff9800"/>
                    </svg>
                </div>
                <h3>Exceptional Quality</h3>
                <p>Surpass the Highest Industry Standards</p>
            </div>
        </div>

        <div className="discord-button-container">
            <button className="discord-btn">
                <svg className="discord-icon" viewBox="0 0 24 24">
              
                    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" fill="#fff"/>
                </svg>
                Join Us On Discord
                <span className="arrow">→</span>
            </button>
        </div>
    </section>
          <section className="testimonials-section">
          <h2>What our customers say</h2>

          <div className="testimonial-slider">
              <button className="nav-btn prev">←</button>
              
              <div className="testimonial-content">
                  <div className="testimonial-image-container">
                      <img src="person-image.jpg" alt="Testimonial" className="testimonial-image"/>
                  </div>
                  
                  <div className="testimonial-text">
                      <h3>Boubkar Benzabat</h3>
                      <p className="role">Director of Photography • Editor • Producer • Director</p>
                      
                      <div className="social-links">
                          <a href="#" className="social-link">IMDb</a>
                          <a href="#" className="social-link">🌐</a>
                      </div>
                      
                      <p className="quote">
                          NOLANAI is the best value-for-money AI tool you can find for preparing and developing your movie. It's exciting to be part of a pioneering solution that will shape the future of the film industry. The NOLANAI team is dedicated, regularly improving the tools, and they are highly communicative and responsive when it comes to solving any issues users may face. The "Script Coverage" and "Plot Hole" tools are like a compass, helping identify critical problems in your script. But what impresses me most is the Pitch Deck creator tool. I used to hate creating Pitch Decks, but NOLANAI makes it fun, easy, fast, and creative!
                      </p>
                  </div>
              </div>

              <button className="nav-btn next">→</button>
          </div>

          <div className="testimonial-cta">
              <button className="all-testimonials-btn">
                  All Testimonials
                  <span className="arrow">→</span>
              </button>
          </div>
      </section>

      <footer className="footer">
          <div className="footer-content">
              <div className="footer-logo">
                  <img src="nolan-logo.png" alt="Nolan AI"/>
              </div>
              
              <div className="footer-links">
                  <span>© NolanAI, Inc. 2025</span>
                  <nav>
                      <a href="#">Testimonials</a>
                      <a href="#">Privacy Policy</a>
                      <a href="#">Terms of Service</a>
                      <a href="#">Referral Program</a>
                      <a href="#">Releases</a>
                      <a href="#">FAQ</a>
                  </nav>
              </div>

              <div className="social-media">
                  <a href="#" className="social-icon instagram">Instagram</a>
                  <a href="#" className="social-icon twitter">Twitter</a>
                  <a href="#" className="social-icon youtube">YouTube</a>
                  <a href="#" className="social-icon threads">Threads</a>
                  <a href="#" className="social-icon discord">Discord</a>
              </div>
          </div>
      </footer>
    </main>
    </>
  );
}

export default Home;
