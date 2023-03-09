import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Board1 from './board1.js';
import Board1View from './board1view.js';
import BoardWrite from './boardwrite.js';
import MyProfile from './myprofile.js';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/board/list' element={<Board1/>}></Route>
        <Route path='/board/view' element={<Board1View/>}></Route>
        <Route path='/board/write' element={<BoardWrite/>}></Route>
        <Route path='/myprofile' element={<MyProfile/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
