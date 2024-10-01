import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1/GroceryStore")
  .then(() => {
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });

app.get("/", (req, res) => {
  res.send("Server Started...");
});

const userSignupSchema = new mongoose.Schema({
  userName: String,
  email: String,
  phone: String,
  age: Number,
  gender: String,
  address: String,
  password: String,
  cart: Array,
});

const userData = mongoose.model("userData", userSignupSchema);

// Add this to your existing Express.js server code
const categorySchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  price: Number,
  discount: Number,
  image: String,
  weight: Number,
  description: String,
});

const productsSchema = new mongoose.Schema(
  {
    Fruits: [categorySchema],
    Vegetables: [categorySchema],
    Meat: [categorySchema],
    Dairy: [categorySchema],
    Spices: [categorySchema],
    Oils: [categorySchema],
  },
  { collection: "Products" }
);

const Products = mongoose.model("Products", productsSchema);

// app.get("/get/products", async (req, res) => {
//   try {
//     const products = await Products.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

app.get("/get/products", (req, res) => {
  Products.find()
    .then((products) => {
      if (products.length === 0) {
        return res.status(404).send("No products found");
      }
      res.send(products[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  userData
    .findOne({ email: email, password: password })
    .then((user) => {
      if (user) {
        res.send({
          success: true,
          message: "Login successful",
          token: user.email,
        });
      } else {
        res.send({ success: false, message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false, message: "An error occurred" });
    });
});

app.post("/user/get", (req, res) => {
  const authToken = req.body.header.Authorization.split(" ")[1];
  if (authToken) {
    userData
      .findOne({ email: authToken })
      .then((user) => {
        if (user) {
          res.send({
            success: true,
            userData: user,
          });
        } else {
          res.send({ success: false, message: "Can't Find user" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.send({ success: false, message: "An error occurred while Finding user" });
      });
  }
});

app.post("/signup", (req, res) => {

  userData
    .findOne({ email: req.body.email })
    .then((resp) => {
      if (resp) {
        res.send({ success: false, message: "E-mail is already taken" });
      } else {
        const newUser = new userData({
          userName: req.body.userName,
          email: req.body.email,
          phone: req.body.phone,
          age: req.body.age,
          gender: req.body.gender,
          address: req.body.address,
          password: req.body.password,
          cart: req.body.cart,
        });

        newUser
          .save()
          .then((ack) => {
            if (ack) {
              res.send({
                success: true,
                message: "Account created successfully",
                token: ack.email,
              });
            } else {
              res.send({
                success: false,
                message:
                  "Error occurred while creating account, try again later",
              });
            }
          })
          .catch((err) => {
            console.log("Error saving new user:", err);
            res.status(500).send("Internal Server Error");
          });
      }
    })
    .catch((err) => {
      console.log("Error finding user:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/cart/add", (req, res) => {
  const authHeader = req.body.headers.Authorization;

  if (!authHeader) {
    return res.status(404).send({ success: false, message: "Unauthorized" });
  }

  const authToken = authHeader.split(" ")[1];

  if (authToken) {
    userData
      .findOneAndUpdate(
        { email: req.body.email },
        { $push: { cart: req.body.item } },
        { new: true }
      )
      .then((resp) => {
        if (resp) {
          res.send({ success: true, message: "Item add to cart" });
        } else {
          res.send({ success: false, message: "User Not found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .sendStatus(500)
          .send({ success: false, message: "An error occured" });
      });
  } else {
    res.sendStatus(500).send({ success: false, message: "Unauthorized" });
  }
});

app.post("/cart/get", (req, res) => {
  const authToken = req.body.headers.Authorization.split(" ")[1];

  if (authToken) {
    userData
      .findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          res.send({ success: true, userCart: user.cart });
        } else {
          res.send({ success: false, message: "User not exist" });
        }
      })
      .catch((err) => {
        console.log("Error while finding the user ", err);
      });
  } else {
    res.sendStatus(500).send({ success: false, message: "Unauthorized" });
  }
});

app.put("/cart/update", (req, res) => {
  const authToken = req.body.headers.Authorization.split(" ")[1];
  const { itemId, action } = req.body;

  userData
    .findOne({ email: authToken })
    .then((user) => {
      if (!user) {
        return res.send({ success: false, message: "User not found" });
      }

      const cartItemIndex = user.cart.findIndex(
        (cartItem) => cartItem.id === itemId
      );

      if (cartItemIndex === -1) {
        return res.send({ success: false, message: "Item not found in cart" });
      }
      // console.log("Before update", user.cart[cartItemIndex]);
      if (action === "increase") {
        user.cart[cartItemIndex].weight += 1;
      } else if (action === "decrease" && user.cart[cartItemIndex].weight > 1) {
        user.cart[cartItemIndex].weight -= 1;
      } else if (action === "remove") {
        user.cart.splice(cartItemIndex, 1);
      }
      // console.log("After update", user.cart[cartItemIndex]);
      user.markModified("cart");

      user
        .save()
        .then(() => {
          // console.log("while save update", user.cart[cartItemIndex]);
          res.send({
            success: true,
            message: "Item updated",
          });
        })
        .catch((err) => {
          console.log("error while updating cart", err);
          return res.send({
            success: false,
            message: "error while updating cart data",
          });
        });
    })
    .catch((err) => {
      console.log("Error while finding user", err);
      return res.send({ success: false, message: "Error while finding user" });
    });
});
app.put("/cart/checkout", (req, res) => {
  const authToken = req.body.headers.Authorization.split(" ")[1];

  userData
    .findOne({ email: authToken })
    .then((user) => {
      if (!user) {
        return res.send({ success: false, message: "User not found" });
      }

      user.cart = [];

      user.markModified("cart");

      user
        .save()
        .then(() => {
          return res.send({
            success: true,
            message: "Item updated",
          });
        })
        .catch((err) => {
          console.log("error while updating cart", err);
          return res.send({
            success: false,
            message: "error while updating cart data",
          });
        });
    })
    .catch((err) => {
      console.log("Error while finding user", err);
      return res.send({ success: false, message: "Error while finding user" });
    });
});

app.listen(8000, () => {
  console.log("Server started at port 8000");
});
