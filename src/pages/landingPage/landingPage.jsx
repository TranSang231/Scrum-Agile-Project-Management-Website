import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../../assets/styles/pages/landingPage/landingPage.scss";

const LandingPage = () => {
  const contentRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    // Only apply effect on desktop (arbitrary width > 768px)
    if (window.innerWidth < 768) return;
    const node = contentRef.current;
    if (!node) return;
    function handleMouseMove(e) {
      const bounds = node.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const dx = (x - centerX) / centerX;
      const dy = (y - centerY) / centerY;
      node.style.transform = `perspective(1000px) rotateY(${-dx * 9}deg) rotateX(${dy * 7}deg)`;
    }
    function reset() {
      node.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    }
    node.addEventListener("mousemove", handleMouseMove);
    node.addEventListener("mouseleave", reset);
    return () => {
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseleave", reset);
    };
  }, []);

  const handleButtonClick = (e) => {
    e.preventDefault();
    navigate("/login"); 
  };

  return (
    <div className="landing-page">
      <div
        ref={contentRef}
        className={
          `landing-page__content landing-page__content--3d parallax-tilt` +
          (loaded ? " landing-page__content--loaded" : "")
        }
      >
        <h1 className={
          "landing-page__title" + (loaded ? " landing-page__title--in" : "")
        }>
        Manage your projects<br />with clarity and agility
        </h1>
        <p className="landing-page__subtitle">
            Empower your team with a streamlined workflow.<br />
            Plan sprints, track issues, and deliver faster with Agile tools designed for collaboration and productivity.
        </p>
        <button
          className={
            "landing-page__button" + (loaded ? " landing-page__button--in" : "")
          }
          onClick={handleButtonClick}
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
