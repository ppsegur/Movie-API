export interface Film {
  id: number;
  title: string;
  poster_path: string;
  media_type: 'movie';  
}


export interface TvShow {
  id: number;
  name: string;
  poster_path: string;
  media_type: 'tv';  
}


  export interface ListUserResponse {
    page: number
    results: List[]
    total_pages: number
    total_results: number
  }
 
  export interface List {
    account_object_id: string
    adult: number
    average_rating: number
    backdrop_path: any
    created_at: string
    description: string
    featured: number
    id: number
    iso_3166_1: string
    iso_639_1: string
    name: string
    number_of_items: number
    poster_path: any
    public: number
    revenue: number
    runtime: string
    sort_by: number
    updated_at: string
  }
 
