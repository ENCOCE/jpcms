import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState } from 'react';

import axios from "axios";

export default App;

function App() {
  const [refreshedAll, SetRefreshAll] = useState(false);

  return (
    <>
      <Header />
      <Main />
      <Footer />

      {/* <input type="button" value="read" onClick={() => {
        //  axios.get("http://10.200.140.141:3001/read?table=company")
        //   .then((res) => {
        //     for (let i = 0; i < res.data.length; i++)
        //       console.log(res.data[i]);
        //   }).catch((err) => {
        //     console.log(err);
        //   })
      }} /> */}

      {/* <input type="button" value="insert" onClick={() => {
        //var values = {number: "521-111-1111", name: "BBB", type: "CCC", item: "DDD", key: "CCCDDD", date: "2024-01-01", note: ""};
        var values = ["521-111-1111", "BBB", "CCC", "DDD", "CCCDDD", "2024-01-01", ""];

        axios.post("http://10.200.140.149:3001/insert?table=company", values)
          .then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
          })
      }} /> */}

    </>
  );
}