import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="hero-content">
            <h1 className="hero-title">
              Transform Your Career with Our Professional Training
            </h1>
            <p className="hero-subtitle">
              Gain in-demand skills and advance your career with our comprehensive training programs designed for today's job market.
            </p>
            <div className="hero-buttons">
              <Button as={Link} to="/courses" variant="primary" className="me-3">
                Explore Courses
              </Button>
              <Button as={Link} to="/signup" variant="outline-primary">
                Sign Up Free
              </Button>
            </div>
          </Col>
          <Col lg={6} className="hero-image-col">
            <div className="hero-image">
              {/* Replace with your actual image path */}
              <img 
                src="/images/hero-image.png" 
                alt="Students learning" 
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
