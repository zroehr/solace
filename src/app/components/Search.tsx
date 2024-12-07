'use client';

import type { Advocate } from './types';

export default function Search({
  advocates,
  setAdvocates,
  setFilteredAdvocates,
}) {
  const normalizeAndSearch = (
    advocate: Advocate,
    searchTerm: string
  ): boolean => {
    if (!searchTerm) return false;

    const normalizedSearchTerm = searchTerm.toLowerCase();

    // Normalize yearsOfExperience
    const normalizedYears = String(advocate.yearsOfExperience || '');

    // Check all properties for matches
    return [
      advocate.firstName,
      advocate.lastName,
      advocate.city,
      advocate.degree,
      advocate.specialties, // Handle as array
      normalizedYears, // Normalized number
    ].some((property) => {
      if (Array.isArray(property)) {
        // Check if any item in the array matches the search term
        return property.some((item) =>
          item.toLowerCase().includes(normalizedSearchTerm)
        );
      }

      if (typeof property === 'string') {
        // Check string properties
        return property.toLowerCase().includes(normalizedSearchTerm);
      }

      // Ignore other types
      return false;
    });
  };

  const onChange = (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    document.getElementById('search-term').innerHTML = searchTerm || '';

    console.log('filtering advocates...');
    const filterAdvocates = (
      advocates: Advocate[],
      searchTerm: string
    ): Advocate[] => {
      if (!searchTerm) return advocates;

      return advocates.filter((advocate) =>
        normalizeAndSearch(advocate, searchTerm)
      );
    };

    const filteredAdvocates = filterAdvocates(advocates, searchTerm);
    setFilteredAdvocates(filteredAdvocates);
  };

  const handleResetSearchClick = () => {
    console.log(advocates);
    document.getElementById('input-search-term').value = '';
    document.getElementById('search-term').innerHTML = '';
    setFilteredAdvocates(advocates);
  };

  const hasSearchTerm =
    !!document.getElementById('search-term')?.innerHTML?.length;

  return (
    <div className="relative flex flex-col items-end">
      <div className="relative flex items-center">
        <input
          id="input-search-term"
          className="border border-[#38A1DB] rounded px-4 py-2 pl-4 pr-10 focus:outline-none focus:ring focus:ring-[#38A1DB] w-full"
          onChange={onChange}
          placeholder="Type to search..."
        />
        {!!hasSearchTerm && (
          <button
            onClick={handleResetSearchClick}
            className="absolute right-3 text-[#38A1DB] hover:text-[#00324B]"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <p className="absolute bottom-[-30px] text-sm text-[#00324B] mt-2">
        {!!hasSearchTerm && <>Searching for: </>}
        <span id="search-term" className="font-semibold text-[#38A1DB]"></span>
      </p>
    </div>
  );
}
