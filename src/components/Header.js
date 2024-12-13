import React from "react";

export const Header = () => {
    return (
    <div className="header-container">
        <div className="logo-container">
            <div className="spinner">
                <img src="100_dollar_bill.png" alt="100 dollar bill" className="money" />
            </div>
            <img className="ocm-logo" src="wage_map_logo.png"/>
        </div>
        <h2>Wage Map</h2>
    </div>
    )
}