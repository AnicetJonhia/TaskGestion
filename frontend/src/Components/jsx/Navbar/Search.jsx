import React from 'react';

const Search = () => {
    return (
        <form className="d-flex input-group w-50">
            <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
            />
            <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search"></i>
          </span>
        </form>
    )
}

export default Search;