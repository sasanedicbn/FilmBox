import { useEffect } from "react";
import { sendTestimonialFilms } from "../../../api/sendTestimonialFilms";
import { testimonialData } from "../../../utils/testimonialData";

const HeaderTestimonial = () => {
    useEffect(() => {
        const sendData = async () => {
            try {
                await sendTestimonialFilms(testimonialData);
            } catch (error) {
                console.error("Error sending testimonial data:", error);
            }
        };

        sendData();
    }, []);

    return (
        <div className="w-full">
            TESTIMONIAL
        </div>
    );
}

export default HeaderTestimonial;
