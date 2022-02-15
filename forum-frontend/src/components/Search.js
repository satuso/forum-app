import React from 'react'
const Search = ({ search, setSearch }) => {
  const submitSearch = (e) => {
    e.preventDefault()
    setSearch('')
  }
  return (
    <form onSubmit={submitSearch} className='form search-form'>
      <input
        type='text'
        placeholder='Search'
        onFocus={(e) => e.target.placeholder = ''}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      >
      </input>
      <button className='btn btn-primary'><i className='fas fa-search'></i></button>
    </form>
  )
}
export default Search