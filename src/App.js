import './App.css';
// import Header from './Header';
// import Main from './Main';
// import Footer from './Footer';
import { useState } from 'react';
import axios from "axios";

export default App;

function App() {
  // let [connectedDB, setConnectedDB] = useState(false); 
    
  return (
    <div>
      <Company></Company>

      {/* <Header connectedDB={connectedDB} />
      <Main connectedDB={connectedDB} />
      <Footer /> */}

      

      {/* <input type="button" value="read" onClick={() => {
        //  axios.get("http://10.200.140.141:3001/read?table=company")
        //   .then((res) => {
        //     for (let i = 0; i < res.data.length; i++)
        //       console.log(res.data[i]);
        //   }).catch((err) => {
        //     console.log(err);
        //   })
      }} />

      <input type="button" value="insert" onClick={() => {
        var values = {number: "521-111-1111", name: "BBB", type: "CCC", item: "DDD", key: "CCCDDD", date: "2024-01-01", note: ""};

        axios.post("http://10.200.140.141:3001/insert", values)
          .then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
          })
      }} /> */}

    </div>
  );
}

function Company() {
  let [content, setContent] = useState();

  axios.get('http://10.200.140.141:3001/read?table=company')
    .then((response) => {
      if (content === response.data[0].number)
        return;

      console.log(response.data[0].number);
      setContent(response.data[0].number);
    }).catch((err) => {
      console.log(err);
    });

  return (
    <div>{content}</div>
  );
}