import React from 'react';
import Layout from './hoc/Layout/Layout';
import UserPost from './containers/UserPost/UserPost'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <div>
          <Layout>
            <UserPost />
          </Layout>
        </div>
    </BrowserRouter>
  );
}

export default App;
