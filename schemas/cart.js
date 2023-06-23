const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,   //Object ID이기 때문에 문자열
    required: true, // 장바구니는 특정한 사용자만 사용할 수 있다.
  },
  goodsId: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,

  },
  thumbnailUrl: {
    type: String,

  },
  category: {
    type: String,

  }
});

module.exports = mongoose.model("Cart", cartSchema);