import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import splashGif from '../assets/EventSewa(1).gif'

export default function SplashPage() {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/welcome', {replace: true})
        }, 4000)

        return () => clearTimeout(timer)
    }, [navigate])

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <img
                src={splashGif}
                alt="Splash Screen"
                style={{maxWidth: '80%', maxHeight: '80%', objectFit: 'contain'}}
            />
        </div>
    )
}