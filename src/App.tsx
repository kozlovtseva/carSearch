import React from 'react';
import {Provider} from "react-redux";

import Main from "./pages/Main";
import configureStore from "./store/store";

let store = configureStore();

const App: React.FC = () => {
  return (
      <Provider store={store}>
          <Main/>
      </Provider>
  );
}

export default App;
