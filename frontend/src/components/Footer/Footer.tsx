
const Footer = () => {
  return (
    <footer className="w-full dark:bg-gray-900  text-center">
      <p className="text-2xl text-gray-600 dark:text-gray-300 mb-2">
        © {new Date().getFullYear()}{" "}
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Mohamed ElDegheidy
        </span>

        <a
          href="https://mohamedeldegheidy.42web.io/?i=1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline mx-2"
        >
          <img src="../../../public/logo.svg" alt="My portfolio Logo" className="h-12 w-12 inline-block"/>
          Visit my portfolio
        </a>
      </p>
    </footer>
  )
}

export default Footer