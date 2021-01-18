import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { GlobalRouter } from './router/router';
import routers from './router';
import Test from './page/text'; // 官方指定测试区域

ReactDOM.render(
  <React.StrictMode>
      <Suspense fallback={ <div>loading ......</div> }>
          <GlobalRouter routerDate={routers}>
              <Test/>
          </GlobalRouter>
      </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
