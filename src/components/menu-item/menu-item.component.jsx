import React from 'react';
import './menu-item.styles.scss'
import { Link } from 'react-router-dom';

const MenuItem = ({title, imageUrl, size, linkUrl}) => {
    return (
        <Link className={`${size} menu-item`} to={`/${linkUrl}`}>
            <div
            className='background-image'
            style={{
                backgroundImage: `url(${imageUrl})`
            }}> 
            </div>
            <div className='content'>
                <h1 className='title'>{title.toUpperCase()}</h1>
                <span className='subtitle'>SHOP NOW</span>
            </div>
        </Link>
    );
}

export default MenuItem;