import React from 'react';
import Maps from '../pages/Maps'
import HomeImage from '../assets/Images/cover.png'

function Content() {
  return (
    <div>
      <section className="home h-100 w-100" style={{ boxSizing: 'border-box', backgroundColor: '#FFFFFF' }}>
        <div className="container-fluid mx-auto p-0  position-relative header-2-3">
          <div>
            <div className="mx-auto d-flex flex-lg-row flex-column hero">
              {/* Left Column */}
              <div className="left-column d-flex flex-row mb-3 flex-column align-items-lg-start text-lg-start align-items-center text-center">
                <h1 className="headline">We will help you find best hospital you need for your health problems.</h1>
                <p className="text-caption">Good health is a state of mental, physical and social well and it does not just mean the absence of disease.</p>
              </div>
              {/* Right Column */}
              <div className="right-column">
                <img className="cover" src={HomeImage} width={600} height={475} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-2 h-100 w-100" style={{ boxSizing: 'border-box', backgroundColor: '#E6EBFF' }}>
        <div className="container-fluid mx-auto p-0  position-relative maps">
          <div>
            <div className="mx-auto d-flex flex-lg-row flex-column heros">
              {/* Left Column */}
              <div className="left-column d-flex flex-row mb-3  align-items-lg-start text-lg-start justify-content-center text-center">
                <Maps width="800" />
              </div>
              {/* Right Column */}
              <div className="right-column d-flex flex-row mb-3 flex-column align-items-lg-start text-lg-start justify-content-center text-center">
                <h2 className="headline">Try to find hospital near your current location now.</h2>
                <p className="text-caption">Find the best hospital around your location that provides the facilities you need.</p>
              </div>
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
