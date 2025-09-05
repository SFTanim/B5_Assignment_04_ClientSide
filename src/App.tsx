import { Outlet } from "react-router-dom";
import Footer from "./components/pageComponents/Footer";
import Navber from "./components/pageComponents/Navber";

function App() {

  return (
    <div className='container mx-auto bg-white shadow-sm border-b border-gray-200 rounded-t-3xl mt-3 px-4 sm:px-6 lg:px-8 pt-3 min-h-screen'>
      <Navber />
      <div className="min-h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
