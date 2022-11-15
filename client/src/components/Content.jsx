import React from 'react';
import { FaAsterisk, FaRegCircle, FaCircle, FaAngleDown } from 'react-icons/fa';
// import Scrollchor from 'react-scrollchor';

function Content() {
  return (
    <div>
      <section className="home h-100 w-100" style={{ boxSizing: 'border-box', backgroundColor: '#ffffff' }}>
        <div className="container-xxl mx-auto p-0 position-relative header-2-3">
          <div>
            <div className="mx-auto d-flex flex-lg-row flex-column hero">
              {/* Left Column */}
              <div className="left-column d-flex flex-row mb-3 flex-column align-items-lg-start text-lg-start align-items-center text-center">
                <h1 className="headline">We will help you find best hospital you need for your health problems.</h1>
                <p className="text-caption">Good health is a state of mental, physical and social well and it does not just mean the absence of disease.</p>
              </div>
              {/* Right Column */}
              <div className="right-column">
                <img className="cover" src="./Assets/Images/cover.png" width={670} height={700} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="maps h-100 w-100" style={{ boxSizing: 'border-box', backgroundColor: '#e6ebff' }}>
        <div>
          <div className="mx-auto d-flex flex-lg-row flex-column hero">
            {/* Left Column */}
            <div className="left-column">
              <img src="../assets/images/Mapsicle Map.png" width={750} height={700} alt="" />
            </div>
            {/* Right Column */}
            <div className="right-column d-flex flex-row mb-3 flex-column align-items-lg-start text-lg-start justify-content-center text-center">
              <h2 className="headline">Try to find hospital near your current location now.</h2>
              <p className="text-caption">Find the best hospital around your location that provides the facilities you need.</p>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="d-flex justify-content-center flex-column text-center footer">
          <h3>We provide helpful services for you.</h3>
          <p>Find the best hospital around your location that provides the facilities you need.</p>
        </div>
      </footer>
    </div>
  );
}

export default Content;
