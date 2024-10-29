import { collection, endBefore, limit, limitToLast, orderBy, query, startAfter, where } from "firebase/firestore";
import { ReactNode } from "react";
import { db } from "../config/firebase";

type styleType = 'login' | 'searchFilms'

export type InputProps = {
    styleType: styleType,
    type: string,
    name: string,
    value: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
type IconName = 'marked' | 'home' | 'search' | 'star';

export type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  onClick: () => void;
  type: string;
}
export type Film = {
    id2: string;
    imdbid: string;
    image: string;
    year: number;
    title: string;
    description:string,
    director:string[],
    genre: string[],
    id:string,
    rank:number,
    rating: string,
    thumbnail:string,
    trailer: string,
    writers: string[],
  }

export type BodyPageProps = {
  openClickedFilms: () => void;
  openFilms: boolean;
}

export type paginationProps = {
  fetchNextPage:  () => Promise<void>;
  fetchPreviousPage: () => Promise<void>;
  fetchPage: (pageIndex: number) => Promise<void>;
}

export type ButtonProps = {
  type: 'login' | 'pagination' | 'upload' ;
  buttonType?: 'button' | 'submit' | 'reset'; 
  children: React.ReactNode;
  onClick: () => void; 
  disabled?: boolean; 

}

export type LengthPaginationProps = {
  lengthPagination: number; 
  activePage: number; 
  handlePageChange: (page: number) => void; 
}

export type PaginationWrapperProps = {
  children: ReactNode; 
  type: 'smallNumberPagination' | 'bigNumberPagination'; 
}

export type SelectProps = {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode; 
  value?: any;
  className?: string;
}
const coll = collection(db, "films");


// export const allConditions = (action, params) => {
//   const { lastVisible, firstVisible, genre } = params; 

//   switch (action) {
//     let query
//     if(action === 'next')
//       query =  query(
//         coll,
//         orderBy("rating", "desc"),
//         startAfter(lastVisible),
//         limit(12)
//       );
//     if(action === 'prev')
//       query = query(
//         coll,
//         orderBy("rating", "desc"),
//         endBefore(firstVisible),
//         limitToLast(12)
//       );
//     if(action === 'genre')
//       return query(
//             coll,
//             where("genre", "array-contains", genre), 
//             orderBy("genre"),
//             limit(12),
//       );

   
//     return query
// };


export const setQueryData = (action, params) => {
  const { lastVisible, firstVisible, genre, coll } = params;
  console.log('params iz setQuery', lastVisible, genre, coll)
  console.log('action', action)
  let baseConstraints = [limit(12)];
  let orderByConstraint = orderBy("rating", "desc");

  let q = [];

  switch (action) {
    case 'next':
      q = [startAfter(lastVisible)];
      break;
    case 'prev':
      q = [endBefore(firstVisible), limitToLast(12)];
      break;
    case 'genre':
      q = [where("genre", "array-contains", genre)];
      orderByConstraint = orderBy("genre");
      break;
    default:
      break;
  }

  const finalQueryConstraints = [orderByConstraint, ...baseConstraints, ...q];

  return query(coll, ...finalQueryConstraints);
};

// export function prvaPaginacija (action, firstVisible, lastVisible, coll, genre = null ) {
//   const moviesQuery =  setQueryData(action, {firstVisible, lastVisible, coll, genre})
//   return moviesQuery
// }
