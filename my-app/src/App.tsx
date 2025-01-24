import { useEffect, useState } from 'react';
import { getAbsences } from './services/absences';
import ErrorBoundary from './components/ErrorBoundary';
import AbsenceList from './components/AbsenceList/AbsenceList';

function App() {
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    const loadAbsences = async () => {
      try {
        const { data } = await getAbsences();
        setAbsences(data);
      } 
      catch (error) {
        console.error('Error while fetching absences', error);
      }
    }
    loadAbsences();
  }, []);

  return (
    <ErrorBoundary>
      <div className='mx-auto max-w-8xl px-5 overflow-hidden lg:overflow-visible prose-sys'>
        <div className='grid lg:grid-cols-12 gap-6 my-20 rounded-lg shadow-lg p-5 bg-sky-200'>
          <div className='col-span-12'>
            <h1 className='text-base md:text-2xl font-bold mb-5 uppercase'>Absence Manager</h1>
            <AbsenceList data={absences} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
