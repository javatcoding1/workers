import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Shield, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-20 py-20">
      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h1>
          <p className="text-xl text-gray-600">
            At Jamin WorkeLine, we're dedicated to transforming the domestic work sector by creating meaningful connections 
            between skilled workers and quality employers, ensuring dignity and fair opportunities for all.
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Heart,
              title: 'Care',
              description: 'We prioritize the well-being of both workers and employers',
            },
            {
              icon: Target,
              title: 'Excellence',
              description: 'We maintain high standards in all our services',
            },
            {
              icon: Shield,
              title: 'Trust',
              description: 'We build relationships based on transparency and reliability',
            },
            {
              icon: Users,
              title: 'Community',
              description: 'We foster a supportive network for all our members',
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <value.icon className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Founder</h2>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8 text-center">
              <h3 className="text-2xl font-semibold mb-2">E Jayanth Madhav</h3>
              <p className="text-purple-600 mb-4">Founder & CEO</p>
              <p className="text-gray-600">
                With a vision to revolutionize the domestic work sector, E Jayanth Madhav founded Jamin WorkeLine 
                to create a platform that brings dignity, respect, and fair opportunities to domestic workers while 
                providing reliable and quality service to employers.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;