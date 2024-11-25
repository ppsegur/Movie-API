export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
  }

  export interface ListResponse {
    results: List[];
    total_results: number;
    total_pages: number;
  }
  
  
  export interface List {
  poster_path: any;
    id: number;
    name: string;
    description: string;
    item_count: number;
  }
  
