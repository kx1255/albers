import React from 'react';
import '../../components/global/button.scss';
import './settings.scss';

function Settings() {

    return (
        <div className="Content">
            <div className='vertical'>
                <div className='row'>
                    <h1 className='title'>Color Identification </h1>
                    <a href="/how-to-use">?</a>
                </div>

                <div className="button_box">
                    <p>Difficulty</p>
                    <span className='rounded'>Easy</span>
                    <span className='rounded'>Medium</span>
                    <span className='rounded'>Hard</span>
                </div>

                <div className="button_box">
                    <p>Timer</p>
                    <span className='rounded'>None</span>
                    <span className='rounded'>30 seconds</span>
                    <span className='rounded'>60 seconds</span>
                    <span className='rounded'>90 seconds</span>
                </div>
                <a href="/ActualMixing" className="rounded">
                    Let's Begin!
                </a>
            </div>
        </div>

    );
}

export default Settings;
