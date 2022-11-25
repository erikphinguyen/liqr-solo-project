import React, { useState } from 'react';
import './SearchBar.css';
import { csrfFetch } from '../../store/csrf';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons';

function SearchBar({ placeholder }) {

    const [filteredData, setFilteredData] = useState([]);
    const [imageEntered, setImageEntered] = useState('');

    const handleFilter = async (e) => {
        setImageEntered(e.target.value)
        const searchImage = e.target.value;
        let data = { searchTerm: e.target.value }
        const response = await csrfFetch(`/api/images/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const images = await response.json()

        setFilteredData(images)
    }

    // for X icon
    const clearInput = () => {
        setFilteredData([]);
        setImageEntered('')
    }


    return (
        <div className='search'>
            <div className='searchInputs'>
                <input
                    type='text'
                    placeholder={placeholder}
                    value={imageEntered}
                    onChange={handleFilter} />
                <div className='searchIcon'>
                    {filteredData.length === 0 ? <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} /> : <FontAwesomeIcon className='x-icon' id='clearBtn' onClick={clearInput} icon={faXmark} />}
                </div>
            </div>
            {(filteredData.length !== 0) && (
                <div className='dataResult'>
                    {filteredData.map((image) => {
                        return <NavLink to={`/images/${image.id}`} className='dataItem' target="_blank">
                            <p>
                                {image.name}
                            </p>
                        </NavLink>
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar
