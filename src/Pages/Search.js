import React, { useState } from 'react';
import BusinessDetails from '../components/BusinessDetails';
import BusinessSearch from '../components/BusinessSearch';
import BusinessTable from '../components/BusinessTable';
import NavbarComponent from '../components/Navbar';

const Search = () => {
  const [businessResult, setBusinessResult] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState('');

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  return (
    <div>
      <NavbarComponent />
      {/* Search can modify the list  */}
      <BusinessSearch
        businessResult={businessResult}
        setBusinessResult={setBusinessResult}
        setSelectedBusiness={setSelectedBusiness}
      />
      {/* If a search has been initiated, show the table and if a business was selected, show its details */}
      {!selectedBusiness || isEmpty(selectedBusiness) ? (
        <BusinessTable
          businessResult={businessResult}
          setSelectedBusiness={setSelectedBusiness}
        />
      ) : (
        <BusinessDetails
          selectedBusiness={selectedBusiness}
          setSelectedBusiness={setSelectedBusiness}
        />
      )}
    </div>
  );
};

export default Search;
