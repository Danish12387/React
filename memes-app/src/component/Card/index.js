'use client'
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import './index.css';

const Card = ({ items }) => {
    const { name, url, width, height, } = items;

    return (
        <div className='Card_div'>
            <h2>{name}</h2>
            <img src={url} width={width} height={height} />
        </div>
    )
}

export default Card;
