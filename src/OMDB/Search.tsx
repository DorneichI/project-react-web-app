import { Link, useNavigate, useParams } from "react-router-dom";
import * as client from "./client";
// import NapsterAlbums from "./albums";
import React, { useEffect, useState } from "react";
import { setCurrentUser } from "../Users/userReducer";

function OMDBSearch() {
    const navigate=useNavigate();
    const { term, page } = useParams<{ term: string, page: string }>();
    
    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (term && page && !isNaN(parseInt(page))) {
            setSearch(term);
            setPage(parseInt(page));
            fullTextSearchByPage(term, parseInt(page));
        } else if (term) {
            setSearch(term);
            setPage(1);
            fullTextSearch(term);
        }
    }, [term]);
    const [results, setResults] = useState<any>([]);
    const [currentPage, setPage] = useState(1);
    const navigatePages = async (page: number) => {
        if (page <= 0) {
            page = 1;
        } else if (page >= Math.ceil(results.totalResults / 10)) {
            page = Math.ceil(results.totalResults / 10);
        };
        setPage(page);
        fullTextSearchByPage(search, page);
    }
    const fullTextSearch = async (text: string) => {
        setSearch(text);
        setPage(1);
        const results = await client.fullTextSearch(text);
        if (results.Response === "False") {
            setResults(false);
        } else {
            setResults(results);
            navigate(`/MovieMatrix/Search/${text}`);
        }
    };
    const fullTextSearchByPage = async (text: string, page: number) => {
        const results = await client.fullTextSearchByPage(text, page);
        if (results.Response === "False") {
            fullTextSearch(text);
            navigate(`/MovieMatrix/Search/${text}`);
        } else {
            setResults(results);
            navigate(`/MovieMatrix/Search/${text}/${page}`);
        }
        
    };
    return (
        <div className="p-4">
            <h1>Search</h1>
            <hr/>
            <div className="container-fluid">
                <div className="d-flex">
                    <button className="btn btn-dark mt-3 me-3 mb-3" onClick={() => fullTextSearch(search)}>Search</button>
                    <input type="text" value={search} className="form-control m-3" onChange={(e) => setSearch(e.target.value)}
                    placeholder="e.g. Alice in Wonderland"/>
                </div>
                <div className="list-group list-group-flush">
                {results.Search && results.Search.map((item: any) => (
                    <Link to={`/MovieMatrix/Details/${item.imdbID}`} className="list-group-item list-group-item-action" key={item.imdbID}>
                        <div className="fw-bold">{item.Title}</div>{item.Year}
                    </Link>
                ))}
                </div>
                <div className="d-flex justify-content-center">
                    {results && results.totalResults && results.totalResults >= 1 &&
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary" onClick={() => navigatePages(currentPage-3)} disabled={currentPage <= 1}>&laquo;</button>
                        {0 < currentPage-1 && currentPage-1 < Math.ceil(results.totalResults / 10) && 
                        <button type="button" className="btn btn-secondary" onClick={() => navigatePages(currentPage-1)}>{currentPage-1}</button>}
                        <button type="button" className="btn btn-light">{currentPage}</button>
                        {currentPage+1 <= Math.ceil(results.totalResults / 10) &&
                        <button type="button" className="btn btn-secondary" onClick={() => navigatePages(currentPage+1)}>{currentPage+1}</button>}
                        <button type="button" className="btn btn-secondary" onClick={() => navigatePages(currentPage+3)} disabled={currentPage >= Math.ceil(results.totalResults / 10)}>&raquo;</button>
                    </div>}
                    {(results === false) ? <>No Results</> : <></>}
                </div>
            </div>
        </div>
    );

}

export default OMDBSearch;