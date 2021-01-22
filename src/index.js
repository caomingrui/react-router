import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { GlobalRouter } from './router/router';
import routers from './router';
import { store } from './store/vueStore/index';  // vue3.0 双向数据
import { Provider, ProviderDa } from './utils/ContextState'; // 公共context 集
import State from "../src/store/vuex/index";
import Test from './page/text'; // 官方指定测试区域

ReactDOM.render(
  <React.StrictMode>
      <Suspense fallback={ <div>loading ......</div> }>
          <ProviderDa value={ State }>
              <Provider value={ store }>
                  <GlobalRouter routerDate={ routers }>
                      <Test/>
                  </GlobalRouter>
              </Provider>
          </ProviderDa>
      </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// const
