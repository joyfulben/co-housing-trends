import React from "react";

export const Header = () => {
    return (
    <div className="header-container">
        <div className="logo-container">
            <img className="wm-logo" src="wage_map_logo.png"/>
        </div>
        <div className="title-container">
            <h2>
                <img className="header-letter" src="w_logo.png"/>
                age
            </h2>
            <h2>
                <img className="header-letter" src="m_logo.png"/>
                ap
            </h2>
        </div>
    </div>
    )
}