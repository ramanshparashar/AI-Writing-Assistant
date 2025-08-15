import React from "react";
import ai from "../images/ai1.png"; // Your own AI illustration
import { Link } from "react-router-dom";
import { FaPencilAlt, FaSpellCheck, FaSyncAlt } from "react-icons/fa";

const Home = () => (
  <div className="min-h-screen bg-white flex flex-col ">
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="w-full min-h-screen">
        <div className="container mx-auto flex flex-col items-center lg:flex-row justify-between gap-10 py-16 px-4">
          <div className="flex-1 mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-5 ml-5 text-gray-900 leading-tight">
              AI you can trust<br />
              making your words and reputation stand out
              {/* <span className="block mt-4  text-blue-600 font-bold text-2xl md:text-3xl">
                With AI
              </span> */}
            </h1>
            <p className="text-lg md:text-xl ml-5 text-gray-600 mb-8 mt-10">
              Unleash the power of artificial intelligence to perfect your
              grammar, eliminate spelling errors, and transform your writing
              style to express ideas clearly, handle tough messages, and keep your work moving forward..
            </p>
            <Link
              to="/write"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-blue-700 transition ml-5"
            >
              Start Free
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img
              src={ai}
              alt="AI Assistant"
              className="w-100 md:w-100 max-h-100 object-contain transition duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Features Section (Light, Simple, Flat) */}
      <section className="py-20 px-6 bg-blue-600">
           <div className="container mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Powerful Features at Your Fingertips
            </h2>
           <div className="flex flex-col md:flex-row justify-center items-center gap-20">
              <FeatureCard
                icon={<FaPencilAlt className="text-6xl text-blue-500" />}
                title="Smart Grammar Correction"
                description="Our AI analyzes context to provide accurate grammar suggestions, helping you write with confidence."
              />
              <FeatureCard
                icon={<FaSpellCheck className="text-6xl text-green-500" />}
                title="Advanced Spell Checker"
                description="Catch even the most elusive spelling errors with our comprehensive dictionary and context-aware spell check."
              />
              <FeatureCard
                icon={<FaSyncAlt className="text-6xl text-purple-500" />}
                title="Intelligent Rephrasing"
                description="Transform your sentences for clarity and impact, tailored to your desired tone and style."
              />
            </div>
          </div>
        </section>
    </main>
    <footer className="bg-white text-gray-500 py-5 text-center border-t">
      <p>AI Writing Assistant ©{new Date().getFullYear()} | Ramansh Parashar</p>
    </footer>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg text-center transition duration-300 hover:scale-105 hover:shadow-blue-400/60 hover:shadow-2xl hover:border-blue-400 w-80 min-h-[340px] flex flex-col justify-center">
    <div className="mb-6">{icon}</div>
    <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
    <p className="text-gray-600 font-medium">{description}</p>
  </div>
);

export default Home;
  

