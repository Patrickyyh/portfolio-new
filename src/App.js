// import scenes
import Navbar   from './scenes/Navbar.jsx'
import DotGroup from "./scenes/DotGroup.jsx"
import Landing  from "./scenes/Landing.jsx"
import MySkills from "./scenes/MySkills.jsx"
import Projects from "./scenes/Projects.jsx"

// Import components
import LineGradient from "./components/LineGradient.jsx"
import { useState ,useEffect } from 'react';
import useMediaQuery from './hooks/useMediaQuery';
import { motion , useScroll , useSpring} from 'framer-motion'

function App() {
  // determine what part
  const [selectedPage , setSelectedPage] = useState('home');
  const [isTopOfPage , setIsTopOfPage]   = useState(true);
  const isAboveMediumeScreens = useMediaQuery("(min-width: 1060px)");
  const { scrollYProgress } = useScroll();

  // scroll bar for
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
      {/* build the scroll bar at the top */}
       <motion.div
         className='position: fixed top-1 left-0 right-0  h-2 w-2px  z-40 bg-red origin-convert '
         style={{scaleX}}>
          {``}
        </motion.div>

      {/* Navbar */}
        <Navbar
          isTopOfPage  = {isTopOfPage}
          selectedPage = {selectedPage}
          setSelectedPage = {setSelectedPage}
        />

      {/* Landing */}
        <div className='w-5/6 mx-auto md:h-full'>
          {isAboveMediumeScreens && (
            <DotGroup
              selectedPage = {selectedPage}
              setSelectedPage = {setSelectedPage}
            />
          )}
            <Landing setSelectedPage = {setSelectedPage}/>
        </div>

        <LineGradient />

            {/* Skills */}
        <div className='w-5/6 mx-auto md:h-full'>
         <motion.div
         margin="0 0 -200px 0"
         amount="all"
         onViewportEnter={() => setSelectedPage("skills")}
        >
            <MySkills />
          </motion.div>
        </div>


        <LineGradient />
        <div className='w-5/6 mx-auto'>
            <Projects/>
        </div>

    </div>
  );
}

export default App;
