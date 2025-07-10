import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './HOC/layout'
import Home from './Pages/Home'
import Innovate from './Pages/Innovate/Inovate'
import AddBanner from './Pages/banner/AddBanner'
import Banner from './Pages/banner/Banner'
import Services from './Pages/Services/Services'
import AboutUs from './Pages/AboutUs/AboutUs'
import Contact from './Pages/Contact/Contact'
import OurTeam from './Pages/Team/OurTeam'

function App() {

  return (
    <>
     <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/addbanner' element={<AddBanner />} />
        <Route path='/banner' element={<Banner />} />
        <Route path='/innovate' element={<Innovate />} />
        <Route path='/services' element={<Services />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/team' element={<OurTeam />} />
      </Route>
     </Routes>
    </>
  )
}

export default App
