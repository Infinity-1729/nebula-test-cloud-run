import React from 'react'

export default function WhatsappFloatingIcon() {
    return (
        <div className="mywp">
            <a href="https://api.whatsapp.com/send?phone=918160062231">
                <div className="circle">
                    <span className="circle__btn">
                        <i className="fab fa-whatsapp" style={{ fontSize: '4.5rem', color: 'black' }} />
                        {/* <ion-icon className="pause" name="pause"></ion-icon> */}
                        {/* <ion-icon className="play" name="play"></ion-icon> */}
                    </span>
                    <span className="circle__back-1"></span>
                    <span className="circle__back-2"></span>
                </div>
            </a>
        </div>
    )
}
