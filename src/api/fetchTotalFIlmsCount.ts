import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../config/firebase";

export const fetchTotalFilmsCount = async () => {
    const coll = collection(db, "films");
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
};
