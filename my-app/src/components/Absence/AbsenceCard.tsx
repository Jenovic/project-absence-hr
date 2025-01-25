import React from 'react';
import { Absence } from '../../types';

interface AbsenceCardProps {
  isOpen: boolean;
  onClose: () => void;
  employeeName: string;
  employeeAbsences: Absence[];
}

const AbsenceCard: React.FC<AbsenceCardProps> = ({ isOpen, onClose, employeeName, employeeAbsences }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full prose-p:p-0 prose-p:m-0" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900"><span className='uppercase'>Full Name: {employeeName}</span> [Absences]</h3>
          <div className="mt-1 py-1">
            {employeeAbsences.map((absence) => (
              <div key={absence.id} className="mb-2 py-2 px-3 bg-sky-300 prose-p:text-black max-sm:prose-p:text-base">
                <p>Start Date: {absence.startDate}</p>
                <p>Days: {absence.days}</p>
                <p>Type: {absence.absenceType}</p>
                <p>Status: {absence.approved ? 'Approved' : 'Pending'}</p>
              </div>
            ))}
          </div>
          <div className="items-center py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-sky-700 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbsenceCard;
