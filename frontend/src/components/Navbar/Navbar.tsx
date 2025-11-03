import { Link } from 'react-router-dom';
import { FilePlus } from 'lucide-react';
import ModeToggle from '../mode-toggle';


const Navbar = () => {
  return (
    <div className=" p-0 h-16 flex items-center justify-between w-full sticky top-0 z-50  dark:bg-gray-900 bg-gray-50">
      <Link to="/">
        <h1 className="sm:text-4xl text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">product store </h1>
      </Link>
      <div className="flex items-center gap-0.5">
        <button className="px-0.5 rounded-sm bg-transparent">
          <Link to="/create"> <FilePlus /> </Link>
        </button>
        <span className="px-0.5 rounded-sm bg-transparent ">
          <ModeToggle />
        </span>
      </div>

    </div>

  )
}

export default Navbar