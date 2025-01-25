import ErrorBoundary from './components/ErrorBoundary';
import AbsenceList from './components/Absence/AbsenceList';
import { useGetAbsencesQuery } from './services/brighthrApi';
import Loader from './components/Loader';

function App() {
  const {data: absences, error, isLoading } = useGetAbsencesQuery();

  if (isLoading) return <Loader />;
  if (error) return <div>There was an error</div>;

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
