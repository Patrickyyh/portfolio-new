import Navbar from './scenes/Navbar.jsx'
import { useState ,useEffect } from 'react';
import useMediaQuery from './hooks/useMediaQuery';

function App() {
  // determine what part
  const [selectedPage , setSelectedPage] = useState('home');
  const [isTopOfPage , setIsTopOfPage]   = useState(true);
  const isAboveMediumeScreens = useMediaQuery("(min-width: 1060px)");
  useEffect(()=>{
        const handleScroll =() =>{
          if(window.scrollY === 0) setIsTopOfPage(true);
          if(window.scrollY !== 0) setIsTopOfPage(false);
        }
        window.addEventListener("scroll" , handleScroll);
        return () => window.removeEventListener("scroll" , handleScroll);
  },[])


  return (
    <div className="app bg-deep-blue">
        <Navbar
          isTopOfPage  = {isTopOfPage}
          selectedPage = {selectedPage}
          setSelectedPage = {setSelectedPage}
        />
    </div>
  );
}

export default App;
