import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Landing-page/Landing-header";
import LoginPopup from "../components/Auth/LoginPopup";
import RegisterPopup from "../components/Auth/RegisterPopup";
import LandingFooter from "../components/Landing-page/Landing-footer";
import "./../styles/landing.css";
import animationVideo from "../components/animation/animation2.mp4";

const LandingPage = () => {
  const { t } = useTranslation(); // Import useTranslation hook
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  const scrollToContact = () => {
    document.getElementById("contact-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="landing-page">
      <Header onContactClick={scrollToContact} />
      <section className="hero">
        <div className="hero-content">
          <h1>{t("hello")}</h1>
          <p>{t("description")}</p>
          <button
            className="cta-btn"
            onClick={() => {
              setShowLoginPopup(true);
              setShowRegisterPopup(false); // Ensure only login is shown
            }}
          >
            {t("getStarted")}
          </button>
        </div>
        <div className="hero-video">
          <video autoPlay loop muted className="video-bg">
            <source src={animationVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {showLoginPopup && (
        <LoginPopup
          onClose={() => setShowLoginPopup(false)}
          onSwitchToRegister={() => {
            setShowLoginPopup(false);
            setShowRegisterPopup(true);
          }}
        />
      )}

      {showRegisterPopup && (
        <RegisterPopup
          onClose={() => setShowRegisterPopup(false)}
          onSwitchToLogin={() => {
            setShowRegisterPopup(false);
            setShowLoginPopup(true);
          }}
        />
      )}

      <LandingFooter />
    </div>
  );
};

export default LandingPage; 
