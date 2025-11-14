import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const About = () => {
  return (
    <div>
      <Navbar />
      <AboutContent />
      <Footer />
    </div>
  );
};

const AboutContent = () => {
  return (
    <div className='relative'>
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="object-cover w-full h-full opacity-15"
          autoPlay
          loop
          muted
          playsInline
        >
          Your browser does not support HTML5 video.
        </video>
      </div>
      <div className="bg-gray-800 py-10 md:py-20 overflow-hidden">
        <div className='min-h-10 max-w-7xl mx-auto py-4 px-4 md:px-8 lg:px-12'>
          {/* Company Introduction */}
          <section className="text-center mb-10 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-red-500 py-5">About Us</h1>
            <p className="text-lg text-white max-w-2xl mx-auto">
              We are a leading company in the industry, dedicated to providing innovative solutions and exceptional services. Our team of experts works tirelessly to ensure client satisfaction and drive success.
            </p>
          </section>

          {/* Team Section */}
          <section className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-red-500">Meet Our Team</h2>
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
              {/* CEO */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-xs mx-auto">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXU6BfHeMyziN96qKydBoGhxKOUi1S1QH6og&s" alt="CEO" className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-gray-200 mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">John Doe</h3>
                <p className="text-gray-600">CEO</p>
              </div>
              {/* CTO */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-xs mx-auto">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4dB_3MrmPx3IgEnvsGGAU-KNCdx1TketFg&s" alt="CTO" className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-gray-200 mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">Jane Smith</h3>
                <p className="text-gray-600">CTO</p>
              </div>
              {/* COO */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-xs mx-auto">
                <img src="https://assets.bizclikmedia.net/668/69cfa718fb1335c84a122810c694d96f:8ff225630f33fef23437770d82ae9f2b/maria-black-headshot.jpg" alt="COO" className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-gray-200 mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">Emily Johnson</h3>
                <p className="text-gray-600">COO</p>
              </div>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-red-500">Our Mission</h2>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Our mission is to deliver cutting-edge solutions and unparalleled service. We strive to innovate and excel, keeping our clients at the center of everything we do.
            </p>
          </section>

          {/* Images with Text Section */}
          <section className="mb-10 md:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center max-w-5xl mx-auto px-4">
              {/* Text Block */}
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-red-500 mb-4">Innovative Solutions</h2>
                <p className="text-lg text-white mb-4">
                  Our innovative solutions are designed to meet the ever-evolving needs of our clients. We continuously push the boundaries to provide the most effective and efficient services.
                </p>
                <p className="text-lg text-white">
                  Our team of dedicated professionals is committed to delivering excellence and exceeding expectations. Discover how we can help you achieve your goals.
                </p>
              </div>
              {/* Images */}
              <div className="flex flex-col gap-4">
                <img
                  src={"https://d8it4huxumps7.cloudfront.net/uploads/images/66a3829b1d2da_jobs_internships.png?d=996x803"}
                  alt="Job Search Illustration"
                  className='w-full h-auto object-cover bg-gray-400 rounded-lg shadow-xl'
                />
                <img
                  src={"https://d8it4huxumps7.cloudfront.net/uploads/images/66a3832c2f4a3_compete.png?d=996x803"}
                  alt="Compete Illustration"
                  className='w-full h-auto object-cover bg-gray-400 rounded-lg shadow-xl'
                />
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-red-500">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Integrity</h3>
                <p className="text-gray-600">We maintain the highest standards of integrity and ethical practices in all aspects of our business.</p>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Innovation</h3>
                <p className="text-gray-600">We embrace innovation and continuously strive to improve our solutions and services.</p>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Excellence</h3>
                <p className="text-gray-600">We are committed to delivering excellence in everything we do, from client interactions to project execution.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
