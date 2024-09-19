import { collection, getDocs } from "firebase/firestore";
import { db, } from "../../../config/firebase";


const HeaderTestimonial = () => {
    
     const getTestimonialFilms = async () => {
        const testimonialCollection = collection(db, 'testimonialFilms'); 
        const testimonialSnapshot = await getDocs(testimonialCollection);
        console.log(testimonialSnapshot,'snapshottestimonial')
        const testimonialList = testimonialSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log(testimonialList, 'vraceni filmovi')
        
        return testimonialList;
    };
    return (
        <div className="w-full">
            TESTIMONIAL
            <button onClick={getTestimonialFilms}>ADDDD TESTIMONIAL</button>
        </div>
    );
}

export default HeaderTestimonial;
