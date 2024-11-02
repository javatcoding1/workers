import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, IndianRupee, Clock, Filter, CheckCircle } from 'lucide-react';
import axios from 'axios';
import WorkerDetailsPopup from './workerDetailspopups'; // Ensure correct import casing

interface Location {
  city: string;
  state: string;
  pincode: string;
}

interface Salary {
  amount: number;
  type: 'Monthly' | 'Daily' | 'Hourly';
}

interface Worker {
  _id: string;
  name: string;
  role: string;
  location: Location;
  salary: Salary;
  availability: string;
  languages: string[];
  skills: string[];
  verified: boolean;
  number: string; // Phone number
}

const Services: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null); // State for selected worker
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Worker[]>('/api/workers');
      setWorkers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch workers. Please try again later.');
      console.error('Error fetching workers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          worker.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || worker.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const onResetFilters = () => {
    setSearchTerm('');
    setSelectedRole('');
  };

  const openPopup = (worker: Worker) => {
    setSelectedWorker(worker);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedWorker(null);
    setIsPopupOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p>{error}</p>
          <button
            onClick={fetchWorkers} // Retry fetching workers
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or role..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="Cook">Cook</option>
              <option value="Maid">Maid</option>
              <option value="Driver">Driver</option>
              <option value="Nanny">Nanny</option>
              <option value="Gardener">Gardener</option>
              <option value="Elder Care">Elder Care</option>
            </select>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              onClick={onResetFilters}
            >
              <Filter className="w-4 h-4" />
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Workers Grid */}
      {filteredWorkers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No workers found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <motion.div
              key={worker._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative p-6">
                {worker.verified && (
                  <div className="absolute top-4 right-4 text-green-600">
                    <CheckCircle className="w-6 h-6" title="Verified" />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{worker.name}</h3>
                <p className="text-purple-600 font-medium mb-4">{worker.role}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{worker.location.city}, {worker.location.state}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <IndianRupee className="w-4 h-4" />
                    <span>₹{worker.salary.amount}/{worker.salary.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{worker.availability}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {worker.languages.map((language, index) => (
                    <span
                      key={`${worker._id}-lang-${index}`}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  ))}
                  {worker.skills.map((skill, index) => (
                    <span
                      key={`${worker._id}-skill-${index}`}
                      className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button 
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                  onClick={() => openPopup(worker)} // Open popup with selected worker details
                >
                  Contact Worker
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Worker Details Popup */}
      {isPopupOpen && selectedWorker && (
        <WorkerDetailsPopup
          _id={selectedWorker._id}
          name={selectedWorker.name}
          role={selectedWorker.role}
          location={selectedWorker.location}
          salary={selectedWorker.salary}
          availability={selectedWorker.availability}
          languages={selectedWorker.languages}
          skills={selectedWorker.skills}
          verified={selectedWorker.verified}
          number={selectedWorker.number} // Assuming this is the correct field for the phone number
          onClose={closePopup} // Close popup handler
        />
      )}
    </div>
  );
};

export default Services;
