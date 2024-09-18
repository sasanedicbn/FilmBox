import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const fetchData = async (films) => {
  try {
    if(films){
        for(const film of films){
            await addDoc(collection(db, 'films'), film);
        }
    }
    console.log("Podaci su uspešno poslati!");
  } catch (error) {
    console.error("Greška prilikom slanja podataka: ", error);
  }
};
