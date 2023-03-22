import './App.css';
// import Header from './Header';
// import Main from './Main';
// import Footer from './Footer';
import { useState } from 'react';
import axios from "axios";

function App() {
  let [connectedDB, setConnectedDB] = useState(false); 
    
  return (
    <div>
      {/* <Header connectedDB={connectedDB} />
      <Main connectedDB={connectedDB} />
      <Footer /> */}

      <input type="button" value="read" onClick={() => {
        axios.get("http://10.200.140.141:3001/read")
          .then((res) => {
            for (let i = 0; i < res.data.length; i++)
              console.log(res.data[i]);

              console.log(res.data[0].사업자번호);
          }).catch((err) => {
            console.log(err);
          })
      }} />

      <input type="button" value="insert" onClick={() => {
        // let values = {사업자번호: "321-111-12345", 가맹점명: "BBB", 업태: "CCC", 업종: "DDD", 업태업종_Key: "CCCDDD", 등록일자: "2024-01-01", 비고: ""};
        let values = ["321-111-12345", "BBB", "CCC", "DDD", "CCCDDD", "2024-01-01", ""];

        axios.post("http://10.200.140.141:3001/insert", values)
          .then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
          })
      }} />

    </div>
  );
}

export default App;
