import SliderComponent from "@/components/SliderComponent/SliderComponent";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gray-100 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg text-gray-600">
          Discover amazing features and solutions designed for you.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Get Started
        </button>
      </section>

      <div className="mt-[1000px] mb-[1000px]">
        {/* Demo Content Section 1 */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Feature One</h3>
              <p className="text-gray-600">
                A brief description of the feature, highlighting its value.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Feature Two</h3>
              <p className="text-gray-600">
                Another great feature to catch your attention.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Feature Three</h3>
              <p className="text-gray-600">
                Learn more about how this can help you achieve success.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Slider Component */}
      <section>
        <SliderComponent />
      </section>

      <div className="mt-96 mb-96">
        {/* Demo Content Section 2 */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Our Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white shadow-md rounded-lg">
                <p className="text-gray-600 italic">
                  "This service has changed my life for the better!"
                </p>
                <span className="block mt-4 text-blue-600 font-bold">
                  - John Doe
                </span>
              </div>
              <div className="p-6 bg-white shadow-md rounded-lg">
                <p className="text-gray-600 italic">
                  "Incredible value and amazing support from the team."
                </p>
                <span className="block mt-4 text-blue-600 font-bold">
                  - Jane Smith
                </span>
              </div>
              <div className="p-6 bg-white shadow-md rounded-lg">
                <p className="text-gray-600 italic">
                  "Highly recommend to everyone looking for quality."
                </p>
                <span className="block mt-4 text-blue-600 font-bold">
                  - Sam Wilson
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Demo Content Section 3 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full"></div>
              <h3 className="text-lg font-semibold">Alex Johnson</h3>
              <p className="text-gray-600 text-sm">Lead Developer</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full"></div>
              <h3 className="text-lg font-semibold">Emma Davis</h3>
              <p className="text-gray-600 text-sm">Product Designer</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full"></div>
              <h3 className="text-lg font-semibold">Michael Lee</h3>
              <p className="text-gray-600 text-sm">Marketing Specialist</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
