import React from 'react';
import '../../components/global/button.scss';
import tool from '../../assets/tool.png';


function HowToUse() {
  return (
    <div className="ContentSection">
      <div className="first">
        <h3>How to Use</h3>
        <p>
          <br />
          <br />
          The Color Identification Tool lets you test your sensitivity towards colors.
          Click on the arrows to add colors and see how close you can get to the given color.
        </p>
        <div className="ContentSection" style={{justifyContent: 'space-between'}}>
          <a href='/easy'><span className='rounded'>Easy</span></a>
          <a href='/medium'><span className='rounded'>Medium</span></a>
          <a href='/hard'><span className='rounded'>Hard</span></a>
        </div>
      </div>
      <img src={tool} alt="Identification Main Frame" width="50%" loading="lazy" />
    </div>
  );
}

export default HowToUse;