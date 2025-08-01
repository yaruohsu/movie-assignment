const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-blue-600">
        Welcome to Movie2Watch 🎬
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 max-w-xl">
        Start by searching your favorite movies using the search bar above.
      </p>
      <p className="text-sm sm:text-base text-gray-400 max-w-md">
        Use the Watch List feature to save movies you want to watch later.
      </p>
    </div>
  )
}

export default WelcomePage
