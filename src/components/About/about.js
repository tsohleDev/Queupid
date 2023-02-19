import chairs from "../Assets/Images/chairs 1.svg";
//import ChairsII from "../Assets/Images/2022-04-19 1.svg";
import "./about.scss";

function About() {
    return (
        <div className="about">
            <h1>About</h1>

            <p> Welcome to our Barber Shop! Located in the heart of Welkom, South Africa, we are a locally-owned and operated barber shop that is dedicated to providing our clients with a high-quality grooming experience. With over 10 years of experience in the industry, our skilled barbers are committed to making sure you leave our shop looking and feeling your best. 
                At our Barber Shop, we understand that a trip to the barber is more than just a haircut. It's a time to relax, unwind, and be pampered. That's why we offer a wide range of services, including haircuts, shaves, and grooming services, all performed in a comfortable and welcoming environment. We use only the best products and tools to ensure that you receive the best possible care, every time you visit.
                Whether you're looking for a classic haircut or a contemporary style, our team of talented barbers will work with you to create a look that is tailored to your unique style and preferences. </p>

            <img src={chairs} alt='Client' />

            <p> Our goal is to make sure that you leave our shop feeling confident, refreshed, and ready to tackle whatever life has in store.
                In addition to our haircuts and grooming services, we also offer a range of other amenities to make your visit as enjoyable as possible. From complimentary drinks and snacks to a relaxing lounge area, we strive to provide our clients with a one-of-a-kind grooming experience.
                So if you're in the Welkom area, come visit us at our Barber Shop and let us help you look and feel your best!
            </p>
        </div>
    )
}

export default About;