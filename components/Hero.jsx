import PropertySearchForm from "./PropertySearchForm";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-blue-700 via-blue-400 to-white py-20 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Find The Perfect Rental
          </h1>
          <p className="my-4 text-xl text-white">
            Discover the perfect property that suits your needs.
          </p>
        </div>
        {/* <!-- Form Component --> */}
        <PropertySearchForm />
      </div>
    </section>
  );
};

export default Hero;
