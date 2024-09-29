

import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../config/firebase";

let lastVisible = null; 

export const paginations = async () => {
    const testimonialCollection = collection(db, "films");
    
    const testimonialQuery = query(
        testimonialCollection,
        orderBy('id'),  
        limit(12),
        ...(lastVisible ? [startAfter(lastVisible)] : []) 
    );

    try {
        const testimonialSnapshot = await getDocs(testimonialQuery);
        console.log(testimonialSnapshot, 'testimonialSnapshot')

        if (!testimonialSnapshot.empty) {
            lastVisible = testimonialSnapshot.docs[testimonialSnapshot.docs.length - 1];
        }

        const testimonialList = testimonialSnapshot.docs.map((doc) => ({
            id2: doc.id,
            ...doc.data(),
        }));

        console.log('Paginated Testimonials:', testimonialList);

        if (testimonialSnapshot.size < 12) {
            console.log("Nema više dokumenata za prikaz.");
        }

        return testimonialList; 
    } catch (error) {
        console.error("Greška prilikom dohvatanja dokumenata: ", error);
    }
};
