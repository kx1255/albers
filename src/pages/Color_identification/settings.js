import React from 'react';
import '../../components/global/button.scss';
import './settings.scss';

function Settings() {

    return (
        <div className="Content">
            <div className='vertical'>
                <div className='row'>
                    <h3 className='title'>Color Identification </h3>
                    <a href="/how-to-use">?</a>
                </div>

                <div className="button_box">
                    <p>Difficulty</p>
                    <a href='/easy'><span className='rounded'>Easy</span></a>
                    <a href='/medium'><span className='rounded'>Medium</span></a>
                    <a href='/hard'><span className='rounded'>Hard</span></a>
                </div>

            </div>
        </div>

    );
}

export default Settings;
