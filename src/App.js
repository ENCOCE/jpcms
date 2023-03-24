import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import * as XLSX from 'xlsx';

export default App;

async function openExcel(e) {
  e.preventDefault();

        console.log('reading input file:');

        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "",
        });
      
        //console.log(e.target.files[0]);
        //console.log(workbook);
        console.log(jsonData);   
}

function App() {
  return (
    <div>
      <input type="file" onInput={(e) => openExcel(e)}/>

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