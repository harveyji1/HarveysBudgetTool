import { MdOutlineEmail } from 'react-icons/md';
import './Contact.css';
import { IoPhonePortraitOutline } from 'react-icons/io5';

function Contact() {
    return(
        <div id='contact'>
            <h1 className='contactHeader'>Contact Me</h1>
            <div className='contactContainer'>
                <div className='contactOptions'>
                <article className='contactCard'>
                    <MdOutlineEmail className='contactIcon'/>
                    <h4>Email</h4>
                    <h5>harvey.ji123@gmail.com</h5>
                </article>
                <article className='contactCard'>
                    <IoPhonePortraitOutline className='contactIcon'/>
                    <h4>Phone</h4>
                    <h5>+1 (913) 915-4114</h5>
                </article>
                </div>
                <div className='portfolioCard'>
                <h3>Like this Project?</h3>
                <h5>Check out the rest of my portfolio!</h5>
                </div>
            </div>

        </div>
    )
}

export default Contact;