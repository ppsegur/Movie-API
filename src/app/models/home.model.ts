export interface MoviesNewsListResponse {
    dates: Dates
    page: number
    results: MovieNew[]
    total_pages: number
    total_results: number
  }
  
  export interface Dates {
    maximum: string
    minimum: string
  }
  
  export interface MovieNew {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }
  
/*Series tv news*/ 
export interface SeriestvnewsListResponse {
  page: number
  id: number
  results: Serietvnew[]
  total_pages: number
  total_results: number
}

export interface Serietvnew {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path?: string
  first_air_date: string
  name: string
  vote_average: number
  vote_count: number
}

  