import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';

// import pizzas from './assets/pizzas.json';

function App() {
  const [searchValue, setSearchValue] = React.useState('');

console.log(searchValue);

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className="content">
        
          <Routes>
            <Route path='/' element={<Home searchValue={searchValue} setSearchValue={setSearchValue}/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;
