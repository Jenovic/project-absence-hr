import React from 'react';
import AbsenceList from './components/AbsenceList/AbsenceList';

function App() {
  return (
    <div className='mx-auto max-w-8xl px-5 overflow-hidden lg:overflow-visible'>
      <div className='grid lg:grid-cols-12 gap-6 my-20 rounded-lg shadow-lg p-5 bg-sky-200'>
        <div className='col-span-12'>
          <h1 className='text-base md:text-2xl font-bold mb-5 uppercase'>Absences</h1>
          <AbsenceList />
        </div>
      </div>
    </div>
  );
}

export default App;
