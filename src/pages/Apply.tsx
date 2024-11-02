import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle } from 'lucide-react';
import axios from 'axios';

const Apply = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: '',
    experience: '',
    languages: [],
    skills: '',
    salary: {
      amount: '',
      type: 'Monthly'
    },
    availability: '',
    location: {
      city: '',
      state: '',
      pincode: ''
    }
  });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/workers', formData);
      console.log('Worker registered:', response.data);
      // Add success notification here
    } catch (error) {
      console.error('Registration error:', error);
      // Add error notification here
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Platform</h1>
          <p className="text-gray-600">
            Start your journey with us and connect with employers looking for your skills.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Location</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.location.city}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: {...formData.location, city: e.target.value}
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    value={formData.location.state}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: {...formData.location, state: e.target.value}
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    {/* Add more states */}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={formData.location.pincode}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: {...formData.location, pincode: e.target.value}
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Professional Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="Cook">Cook</option>
                  <option value="Maid">Maid</option>
                  <option value="Driver">Driver</option>
                  <option value="Nanny">Nanny</option>
                  <option value="Gardener">Gardener</option>
                  <option value="Elder Care">Elder Care</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Languages Known
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi'].map((language) => (
                    <label key={language} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={language}
                        checked={formData.languages.includes(language)}
                        onChange={(e) => {
                          const updatedLanguages = e.target.checked
                            ? [...formData.languages, language]
                            : formData.languages.filter(lang => lang !== language);
                          setFormData({...formData, languages: updatedLanguages});
                        }}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">{language}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience (years)
                </label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <textarea
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  rows={3}
                  placeholder="List your relevant skills..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Salary
                  </label>
                  <input
                    type="number"
                    value={formData.salary.amount}
                    onChange={(e) => setFormData({
                      ...formData,
                      salary: {...formData.salary, amount: e.target.value}
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary Type
                  </label>
                  <select
                    value={formData.salary.type}
                    onChange={(e) => setFormData({
                      ...formData,
                      salary: {...formData.salary, type: e.target.value}
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Daily">Daily</option>
                    <option value="Hourly">Hourly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({...formData, availability: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                >
                  <option value="">Select availability</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Live-in">Live-in</option>
                </select>
              </div>
            </div>

            {/* Document Upload */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Documents</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhar Card
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input type="file" className="w-full" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile pic (if available)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input type="file" className="w-full" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the terms and conditions
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Submit Application
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Apply;