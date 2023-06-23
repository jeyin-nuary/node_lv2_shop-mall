// routes/auth.js

const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../schemas/user");

// 로그인 API 생성
router.post("/auth", async (req, res) => {
    const { email, password } = req.body;

    // 이메일이 일치하는 유저를 찾는다.
    const user = await User.findOne({ email });

    // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다.
    // 1. 이메일에 일치하는 유저가 존재하지 않거나
    // 2. 유저를 찾았지만, 유저의 비밀번호와, 입력한 비밀번호가 다를때,
    if (!user || password !== user.password) {
        res.status(400).json({
            errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
        });
        return;
    }
    //jwt.sign(payload, secretOrPrivateKey) 함수는 payload 객체와 비밀 키를 인자로 받아 JWT 토큰을 생성합니다.
    const token = jwt.sign(
        { userId: user.userId },
        "customized-secret-key",
    );

    res.cookie("Authorization", `Bearer ${token}`); // JWT를 Cookie로 할당합니다!
    res.status(200).json({ token }); // JWT를 Body로 할당합니다!
});

module.exports = router;