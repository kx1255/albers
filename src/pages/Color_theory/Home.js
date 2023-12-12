import React from 'react';


function Home() {
    return (
        <div className="Content">
            <div className="ContentSection">
                <h1 style={{ fontSize: '7rem', lineHeight: '7.8rem' }}>
                    <span style={{ color: 'rgba(0, 33, 133, 1)' }}>Color </span>
                    theory is the study of how
                    <span style={{ color: 'rgba(0, 33, 133, 1)' }}> colors </span>
                    <span style={{ color: 'rgba(252, 211, 0, 1)' }}>interact </span> and
                    <span style={{ color: 'rgba(255, 39, 2, 1)' }}> create </span>visual impact. </h1>
            </div>
            <div className="ContentSection" style={{padding: '0% 10% 0% 10%'}}>
                <h6>
                It encompasses concepts such as color mixing, color psychology, and the cultural and symbolic meanings associated with different hues.
                </h6>

            </div>
        </div>
    );
}
export default Home;