import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';

export const sendData = async (films) => {
  try {
    if(films){
        for(const film of films){
            await addDoc(collection(db, 'films'), film);
        }
    }
    toast.success('Data sent successfully!')
  } catch (error) {
    toast.error("Sorry! You can't send data to Firebase. ");
  }
};
