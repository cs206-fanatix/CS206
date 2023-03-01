import Image from 'next/image'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

interface props {
    text: string
}

const Button = (props: props) => {
    return (
        <div className='bglred-400 flex align-middle h-14'>
            <a href="#" className="text-white">{props.text}</a>            
        </div>
    )
}

export default Button