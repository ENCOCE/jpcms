const express = require("express");
const cors = require("cors");
const db = require("mariadb");
const exp = express();
const port = 3001;

const pool = db.createPool({
    host: "10.200.140.149",
    port: 3306,
    user: "guest",
    password: "1001",
    database: "jpcms",
});

exp.use(cors({
    origin: "*",                // 출처 허용 옵션
    credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200   // 응답 상태 200으로 설정
}));

// post 요청 시 값을 객체로 바꿔줌
exp.use(express.urlencoded({ extended: true }));

// 서버 연결 시 발생
exp.listen(port, () => {
    console.log(`server running on port ${port}`);
});

exp.use(express.json({limit:'10MB'}));

exp.get("/count", (request, response) => {
    // response.header("Access-Control-Allow-Origin", "*");

    (async () => {
        let conn, result;
        try {
            conn = await pool.getConnection();
            result = await conn.query(`SELECT COUNT(*) FROM ${request.query.table}`);
        } catch (err) {
            result = err;
        } finally {
            conn.release();

            response.send(result[0]['COUNT(*)'].toString());
        }
    })();
});

exp.get("/read", (request, response) => {
    // response.header("Access-Control-Allow-Origin", "*");

    (async () => {
        let conn, result;
        let limit = (request.query.count === '-1') ? `` : ` LIMIT ${request.query.offset}, ${request.query.count}`;

        try {
            conn = await pool.getConnection();
            result = await conn.query(`SELECT * FROM ${request.query.table}` + limit);
        } catch (err) {
            result = err;
        } finally {
            conn.release();

            response.send(JSON.stringify(result, (key, value) => {
                return typeof value === 'bigint' ? value.toString() : value;
            }));
        }
    })();
});

exp.post("/insert", (request, response) => {
    // response.header("Access-Control-Allow-Origin", "*");
    
    (async () => {
        let conn, result;
        try {
            conn = await pool.getConnection();
            let jsonData = request.body;

            // 수정 필요
            for (let i = 0; i < jsonData.length; i++) {
                result = await conn.query(`INSERT INTO ${request.query.table} VALUES (?)`, [Object.values(jsonData[i])]);
            }
        }
        catch (err) {
            result = err;
        } finally {
            conn.release();

            response.send(JSON.stringify(result, (key, value) => {
                return typeof value === 'bigint' ? value.toString() : value;
            }));
        }
    })();
});

exp.delete("/delete-all", (request, response) => {
    // response.header("Access-Control-Allow-Origin", "*");

    (async () => {
        let conn, result;
        try {
            conn = await pool.getConnection();
            result = await conn.query(`DELETE FROM ${request.query.table}`);
        } catch (err) {
            result = err;
        } finally {
            conn.release();

            response.send(JSON.stringify(result, (key, value) => {
                return typeof value === 'bigint' ? value.toString() : value;
            }));
        }
    })();
});