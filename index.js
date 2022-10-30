const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");
const orderSchema = require("./schema");
const orderDataSchema = require("./OrderItemSchema");
const ig = require("instagram-scraping");

require("./db");
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: "rzp_live_JxIiJ0bff0o2SD",
  key_secret: "8EpLTuI2gPcfNLmBY9D2uOqz",
});
app.get("/", (req, res) => {
  res.json("hello");
});

app.post("/verification", (req, res) => {
  const secret = "12345678";

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  // console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    const data = req.body.payload.payment.entity;
    const info = {
      _id: data.id,
      order_id: data.order_id,
      customer_name: data.notes?.name,
      customer_email: data.email,
      customer_mobile_number: data.notes.contact,
      method: data.method,
      amount: data.amount,
      address: data.notes?.address,
      state: data.notes?.state,
      city: data.notes?.city,
      razorpay_token: data.token_id,
      zip_code: data.notes?.zip_code,
      user_id: data.notes?.user_id,
      order_date: new Date(),
      payment_status: data.status,
    };

    new orderSchema(info).save();
  } else {
    // pass it
  }
  res.json("ok");
});

app.post("/razorpay", async (req, res) => {
  const options = req.body;

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/order-details", async (req, res) => {
  const payload = req.body;
  try {
    await new orderDataSchema(payload).save();
    res.status(200).send("ok");
  } catch (error) {
    console.log(error, "error");
  }
});

app.get("/order-details", async (req, res) => {
  try {
    const data = await orderDataSchema.find();
    res.send(data).status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/verification-user", async (req, res) => {
  try {
    const data = await orderSchema.find();
    res.send(data).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/get-crafted-profile", async (req, res) => {
  try {
    const data = await ig.scrapeUserPage("rikin_9504");
    console.dir(data, "data");
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("Listening on 3001");
});
