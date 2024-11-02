import React from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Trusted Domestic Workers
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with verified domestic workers for your home needs. Quality service, guaranteed satisfaction.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/services"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Find Workers
              </Link>
              <Link
                to="/apply"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold border-2 border-purple-600 hover:bg-purple-50 transition"
              >
                Join as Worker
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { icon: Search, title: 'Easy Search', description: 'Find the perfect worker for your needs quickly and easily' },
            { icon: Shield, title: 'Verified Workers', description: 'All workers are thoroughly vetted and background checked' },
            { icon: Star, title: 'Quality Service', description: 'Experienced professionals delivering excellent service' },
            { icon: Users, title: 'Direct Contact', description: 'Connect directly with workers, no middleman' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <feature.icon className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied homeowners who have found their perfect domestic workers through our platform.
            </p>
            <Link
              to="/services"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Browse Services
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;