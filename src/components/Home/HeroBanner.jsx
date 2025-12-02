import "./HeroBanner.css";
import Logo from "../../assets/images/logo-white.png";
import { FormSelectoption } from "../../components/FormSelectoption";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroBanner = () => {

  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className='box' data-model-id='3116:1408-frame'>
      <div className='group'>
        <img className='rectangle' alt='Rectangle' src='https://c.animaapp.com/RRnEyncc/img/rectangle-11910.svg' />

        <img className='vector' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector.svg' />

        <img className='img' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1.svg' />
        <img className='women-KB-copy' alt='Women KB copy' src='https://c.animaapp.com/RRnEyncc/img/women-kb-copy-1.png' />

        <img
          className='basket-ball-man-copy'
          alt='Basket ball man copy'
          src='https://c.animaapp.com/RRnEyncc/img/basket-ball-man-copy-1.png'
        />
        <nav className={`navbar ${scrolled || navOpen ? "nav-white" : ""}`}>
          <img src={Logo} className='div' alt='Logo' />

          <button
            className='nav-toggle'
            type='button'
            onClick={() => setNavOpen((prev) => !prev)}
          >
            <span className='nav-toggle-bar' />
            <span className='nav-toggle-bar' />
            <span className='nav-toggle-bar' />
          </button>

          <div className={`nav-menu ${navOpen ? "open" : ""}`}>
            <div className='frame'>
              <Link to="/our-experts" className='text-wrapper-2 text-decoration-none'>Our Experts and Packages</Link>
              <Link to="/how-it-works-learners" className='text-wrapper-2 text-decoration-none'>How It Works</Link>
              <Link to="/reach-us" className='text-wrapper-2 text-decoration-none'>Reach Us</Link>
            </div>
            <div className='d-flex gap-5 nav-actions'>
            
            <button className='BTN-2s'>
              <img className='rectangle-4' alt='Rectangle' src='https://c.animaapp.com/RRnEyncc/img/rectangle-1.png' />

              <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-3.svg' />

              <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1-2.svg' />

              <Link to='/signin'><div className='label-3' >Sign In</div></Link>
            </button>
            <button className='BTNns'>
              <div className='rectangle-2' />

              <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

              <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

            <Link to='/registration'> <div className='label'>Join for Free</div></Link>
            </button>
            {/* <FormSelectoption
              className='form-selectoption-instance'
              divClassName='design-component-instance-node'
              icChevron='https://c.animaapp.com/RRnEyncc/img/ic-chevron-1.svg'
            /> */}
          </div>
          </div>
        </nav>
        <div className='hero-content'>
          <h2 className='heading'>
            <span className='span'>This Is Where You Pick Up </span>

            <span className='text-wrapper-3'>A Hobby Or Change Your Lifestyle</span>
          </h2>

          <p className='text'>
            Get personalized coaching from experts in activities that activities you've always wanted to master.
          </p>

          <button className='button'>
            <div className='rectangle-3' />

            <img className='vector-3' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-2.svg' />

            <img className='line-2' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1-1.svg' />

            <Link to='/our-packages'><div className='label-2'>Start Your Discovery</div></Link>
          </button>
        </div>


      </div>
    </div>
  );
};

export default HeroBanner;
