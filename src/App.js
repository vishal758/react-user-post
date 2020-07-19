import React from 'react';
import Layout from './hoc/Layout/Layout';
import UserPost from './containers/UserPost/UserPost'
import { BrowserRouter } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
// library.add(faUser, faTwitter);
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
