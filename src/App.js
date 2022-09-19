import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Post from './components/Post';
import { Routes, Route} from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
function App() {

  return (
    <div className="App">

      <Header />
      <Routes>
        <Route exact path='/' element={
        <div className='home-container'>
        <Signin />
        <Signup />
        </div>
        } />
        <Route path='/post' element={<Post />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
