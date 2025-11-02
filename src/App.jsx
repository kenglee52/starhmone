import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './noto-sans-lao.css';
import MyNavbar from './components/MyNavbar';
import MyHeroSection from './components/MyHeroSection';
import MyProductSection from './components/MyProductSection';
import MyAbout from './components/MyAbout';
import MyPolicy from './components/MyPolicy';
import MyService from './components/MyService';
import MyFooter from './components/MyFooter';

function App() {
  return (
    <div className="App marshmallow-bg">
      {/* Navbar */}
      <MyNavbar/>
      {/* Hero Section */}
      <MyHeroSection/>
      <MyProductSection/>
      <MyService/>
      <MyAbout/>
      <MyPolicy/>  
      <MyFooter/>
    </div>
  );
}

export default App;
