import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const paginations = async () => {
    const testimonialCollection = collection(db, "films");
    console.log('testimonialCollection', testimonialCollection)
    const testimonialSnapshot = (await getDocs(testimonialCollection)).docs.slice(0,5);
    // for(let i = 0, i )
    const testimonialList = testimonialSnapshot.map((doc) => ({
        id2:doc.id,
        ...doc.data(),
    }))
    console.log('testimonialSnapShot', testimonialSnapshot)
    // console.log('testimonialList', testimonialList)
    // const testimonialList = testimonialSnapshot.docs.map((doc) => ({
    //     id2: doc.id,
    //     ...doc.data(),
    // }));
   
    // const paginationData = testimonialList.slice(0,5)
    // for(let i = 0, i < paginat)
    // console.log('testimonialList paginations', testimonialList)
    // console.log('paginationData', paginationData)
};

