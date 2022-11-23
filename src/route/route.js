import React from 'react';
import ReactDom from 'react-dom'
import {BrowserRouter ,Route, Routes} from 'react-router-dom';

import Main from "../component/main";
import Detail from '../component/detail';
import Order from '../component/result';


  const RoutePath = () => (
    <BrowserRouter>
        <Routes>
            <Route  path="/" element={<Main/>}/>
            <Route  path="/detail" element={<Detail/>}/>
            <Route  path="/result" element={<Order/>}/>
        </Routes>
    </BrowserRouter>

  )

  export default RoutePath;