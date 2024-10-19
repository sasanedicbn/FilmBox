import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import { Film } from '../types/types';

export const sendTestimonialFilms = async (testimonialFilms:Film[]) => {
  try {
    if(testimonialFilms){
        for(const testimonialfilm of testimonialFilms){
            await addDoc(collection(db, 'testimonialFilms'), testimonialfilm);
        }
    }
    toast.success('Data sent successfully!')
  } catch (error) {
    toast.error("Sorry! You can't send data to Firebase. ");
  }
};
