const express = require('express');
const cookieParser = require("cookie-parser");
const goodsRouter = require("./routes/goods");
const cartsRouter = require("./routes/carts.js");
const usersRouter = require("./routes/users.js");
const authRouter = require("./routes/auth.js");
const connect = require("./schemas");

const app = express();
const port = 3000;


connect();   //mongoose 연결

//데이터 타입에 따라 파싱하는게 다름
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("assets"));
app.use(cookieParser());



//req:요청, res:응답, next: 다음 스택으로 정의된 미들웨어 호출
//method와 request로그를 남김
app.use((req, res, next) => {
  console.log('')
  console.log(`${req.method}: ` + 'Request URL:', req.originalUrl, ' - ', new Date());
  console.log('')
  next();
});

app.use("/api", [goodsRouter, cartsRouter, usersRouter, authRouter]);





// app.use("/api", [goodsRouter, cartsRouter, usersRouter, authRouter]);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
