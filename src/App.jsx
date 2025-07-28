

import React from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import AdminPanel from './AdminPanel';

const App = () => {

    React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);


  return (
    <>
    <AdminPanel/>
    </>
  )
}

export default App