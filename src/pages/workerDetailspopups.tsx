// src/components/Services/WorkerDetailsPopup.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Worker {
  _id: string;
  name: string;
  role: string;
  location: {
    city: string;
    state: string;
    pincode: string;
  };
  salary: {
    amount: number;
    type: 'Monthly' | 'Daily' | 'Hourly';
  };
  availability: string;
  languages: string[];
  skills: string[];
  verified: boolean;
  number:string;
  onClose: () => void; // Callback to close the popup
}

const WorkerDetailsPopup: React.FC<Worker> = ({
  _id,
  name,
  role,
  location,
  salary,
  availability,
  languages,
  skills,
  verified,
  number,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-purple-600 font-medium mb-4">{role}</p>

        {verified && (
          <div className="text-green-600 mb-4">
            <CheckCircle className="w-6 h-6 inline" title="Verified" />
            <span className="ml-2">Verified</span>
          </div>
        )}

        <div className="space-y-2 mb-4">
          <p>
            <strong>Location:</strong> {location.city}, {location.state}, {location.pincode}
          </p>
          <p>
            <strong>Salary:</strong> ₹{salary.amount}/{salary.type}
          </p>
          <p>
            <strong>Availability:</strong> {availability}
          </p>
          <p>
            <strong>Languages:</strong> {languages.join(', ')}
          </p>
          <p>
            <strong>Skills:</strong> {skills.join(', ')}
          </p>
          <p>
            <strong>Phone Number:</strong> {number}
          </p>
        </div>

        <button
          className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WorkerDetailsPopup;
