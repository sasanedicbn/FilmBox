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
  type: 'login' | 'pagination' ;
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