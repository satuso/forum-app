import React from 'react'
const Search = ({ search, setSearch }) => {
  const submitSearch = (e) => {
    e.preventDefault()
    setSearch('')
  }
  return (
    <form className='search' onSubmit={submitSearch}>
      <input
        type='text'
        placeholder='Search'
        onFocus={(e) => e.target.placeholder = ''}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      >
      </input>
      <button><i className='fas fa-search'></i></button>
    </form>
  )
}
export default Search