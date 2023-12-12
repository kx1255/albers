import React from 'react';
import '../../components/global/button.scss';
import identificationMainFrameImage from '../../assets/images/identification_main_frame_1.png';

function HowToUse() {
  return (
        <div className="ContentSection">
            <div className="first">
                <h3>How to Use</h3>
                <p>
                <br />
                  The Color Identification Tool lets you test your sensitivity towards colors.
                  Click on the arrows to add colors and see how close you can get to the given color before time runs out.
                </p>
                <a href="/settings"  className='rounded'>Try it out!</a>
            </div>
            <img src={identificationMainFrameImage} alt="Identification Main Frame" loading="lazy" />
          </div>
  );
}

export default HowToUse;