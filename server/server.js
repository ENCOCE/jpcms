const express = require("express"); // npm i express | yarn add express
const cors    = require("cors");    // npm i cors | yarn add cors
const mysql   = require("mysql");   // npm i mysql | yarn add mysql
const app     = express();
const PORT    = 3001; // 포트번호 설정

// MySQL 연결
const db = mysql.createPool({
    host: "10.200.140.141", // 호스트
    port: 3306,
    user: "guest",      // 데이터베이스 계정
    password: "1001",      // 데이터베이스 비밀번호
    database: "jpcms",  // 사용할 데이터베이스
});

app.use(cors({
    origin: "*",                // 출처 허용 옵션
    credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
}))

// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true })) 

// 서버 연결 시 발생
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

app.get("/read", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    const sqlQuery = "SELECT * FROM COMPANY";

    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
});

app.post("/insert", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const refs = req.body;
    const sqlQuery = `INSERT INTO COMPANY(사업자번호, 가맹점명, 업태, 업종, 업태업종 Key, 등록일자, 비고) VALUES(?);`;

    db.query(sqlQuery, [refs], (err, result) => {
        res.send(result);
        printRes(err, result);
    });
});