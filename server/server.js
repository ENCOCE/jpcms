const express = require("express");
const cors    = require("cors");
const db      = require("mariadb");
const exp     = express();
const port    = 3001;

const pool = db.createPool({
    host: "10.200.140.141",
    port: 3306,
    user: "guest",
    password: "1001",
    database: "jpcms",
});

exp.use(cors({
    origin: "*",                // 출처 허용 옵션
    credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200   // 응답 상태 200으로 설정
}))

// post 요청 시 값을 객체로 바꿔줌
exp.use(express.urlencoded({ extended: true })) 

// 서버 연결 시 발생
exp.listen(port, () => {
    console.log(`server running on port ${port}`);
});

exp.use(express.json());

exp.get("/read", (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");

    (async () => {
        let conn, result;
        try {
            conn = await pool.getConnection();
            result = await conn.query(`SELECT * FROM ${request.query.table}`);
        } catch (e) {
            result = e;
        } finally {
            conn?.release();

            response.send(result);
        }
    })();
});

exp.post("/insert", (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");

    (async () => {
        let conn, result;
        try {
            conn = await pool.getConnection();
            result = await conn.query(
                { namedPlaceholders: true, sql: 'INSERT INTO COMPANY VALUES (:number, :name, :type, :item, :key, :date, :note)' }, request.body
            );
        }
        catch (e) {
            result = e;
        } finally {
            conn.release();

            response.send(JSON.stringify(result, (key, value) => {
                return typeof value === 'bigint' ? value.toString() : value;
            }));
        }
    })();
});