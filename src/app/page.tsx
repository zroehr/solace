'use client';

import { useEffect, useState } from 'react';
import { AdvocateCard } from './components/AdvocateCard';
import type { Advocate } from './types';
import Search from './components/Search';

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    console.log('fetching advocates...');
    fetch('/api/advocates').then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  return (
    <main className="m-6">
      <div className="bg-[#F8FAFB] p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-[#00324B]">
            Solace Advocates
          </h1>
          <Search
            advocates={advocates}
            setFilteredAdvocates={setFilteredAdvocates}
            setAdvocates={setAdvocates}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAdvocates.map((advocate, index) => (
          <AdvocateCard key={index} advocate={advocate} />
        ))}
      </div>
      {!filteredAdvocates?.length && (
        <div className="text-center text-muted-foreground mt-8">
          No advocates found. Try adjusting your search criteria.
        </div>
      )}
    </main>
  );
}
