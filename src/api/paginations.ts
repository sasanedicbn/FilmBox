// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../config/firebase";

// export const paginations = async () => {
//     const testimonialCollection = collection(db, "films");
//     console.log('testimonialCollection', testimonialCollection)
//     const testimonialSnapshot = (await getDocs(testimonialCollection)).docs.slice(0,5);
//     // for(let i = 0, i )
//     const testimonialList = testimonialSnapshot.map((doc) => ({
//         id2:doc.id,
//         ...doc.data(),
//     }))
//     console.log('testimonialSnapShot', testimonialSnapshot)
//     // console.log('testimonialList', testimonialList)
//     // const testimonialList = testimonialSnapshot.docs.map((doc) => ({
//     //     id2: doc.id,
//     //     ...doc.data(),
//     // }));
   
//     // const paginationData = testimonialList.slice(0,5)
//     // for(let i = 0, i < paginat)
//     // console.log('testimonialList paginations', testimonialList)
//     // console.log('paginationData', paginationData)
// };

import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../config/firebase";

let lastVisible = null; // Čuva poslednji dokument, koristi se za paginaciju

export const paginations = async () => {
    const testimonialCollection = collection(db, "films");
    
    // Pravimo query sa paginacijom, limitiramo na 5 dokumenata
    const testimonialQuery = query(
        testimonialCollection,
        orderBy('id'),  // Očekuje se da imaš polje 'createdAt' za sortiranje
        limit(4),
        ...(lastVisible ? [startAfter(lastVisible)] : []) // Ako postoji 'lastVisible', koristi ga za početak sledeće stranice
    );

    try {
        // Dohvati dokumente koji odgovaraju query-ju
        const testimonialSnapshot = await getDocs(testimonialQuery);
        console.log(testimonialSnapshot, 'testimonialSnapshot')

        // Ako dobijemo dokumente, poslednji će biti korišćen za sledeću paginaciju
        if (!testimonialSnapshot.empty) {
            lastVisible = testimonialSnapshot.docs[testimonialSnapshot.docs.length - 1];
        }

        // Mapiramo dokumente u listu
        const testimonialList = testimonialSnapshot.docs.map((doc) => ({
            id2: doc.id,
            ...doc.data(),
        }));

        // Ispisujemo rezultate
        console.log('Paginated Testimonials:', testimonialList);

        // Proveravamo da li ima više dokumenata za sledeću paginaciju
        if (testimonialSnapshot.size < 10) {
            console.log("Nema više dokumenata za prikaz.");
        }

        return testimonialList; // Vraća listu ako je potrebno dalje procesuirati
    } catch (error) {
        console.error("Greška prilikom dohvatanja dokumenata: ", error);
    }
};
