var express = require('express')
var app = express()
var cors = require('cors')
app.use(cors());

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shopping"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// -------------home product--------------------
app.get('/', function (req, res) {

  var sql = "SELECT * FROM `products` ";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(result);
  });
})

// -------------pagination product--------------------
app.get('/products/:page', function (req, res) {
  var limit = 10;
  var ofset = (req.params.page - 1) * limit;
  var sql = "SELECT * FROM `products` ORDER BY id DESC LIMIT " + ofset + " , " + limit;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(result);
  });
})

// -------------admin paging --------------------
app.get('/admin/products/:page', function (req, res) {
  var limit = 5;
  var ofset = (req.params.page - 1) * limit;
  var sql = "SELECT * FROM `products` ORDER BY id DESC LIMIT " + ofset + " , " + limit;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(result);
  });
})

// -------------details--------------------
app.get('/detail/:id', function (req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM `products` where id = " + id;

  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log(result);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept");
    res.send(result);
  });
})

// -------------countproducts-------------
app.get('/countproducts', function (req, res) {

  var sql = "SELECT count(*) as total FROM `products` ";

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(result);
  });
})


// --------------------delete-----------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.delete('/api/product/:id', function (req, res) {

  var id = req.params.id;
  console.log(id)
  let sql = "DELETE FROM `products` WHERE id = " + id;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept");
    res.send(result);
  });
})

// ----------------Add product----------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.post('/api/product', function (req, res) {
  console.log(req.body)
  var sql = "INSERT INTO `products`(`name`, `image`, `price`, `idcategory`, `quantity`, `description`) VALUES ('" + req.body.name + "','" + req.body.image + "','" + req.body.price + "','" + req.body.idcategory + "','" + 1 + "', '" + req.body.description + "')"
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("2" + result);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send("good");

  });
})

// ---------------Edit products---------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.put('/api/product/:id', function (req, res) {
  console.log(req.body)
  var id = req.params.id;
  var sql = "UPDATE `products` SET `name`='" + req.body.name + "',`image`='" + req.body.image + "',`price`='" + req.body.price + "',`idcategory`='" + req.body.idcategory + "',`description`='" + req.body.description + "' WHERE id =" + id;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("a " + result, id);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send("good");

  });
})

// -------------getData category --------------------
app.get('/category', function (req, res) {

  var sql = "SELECT * FROM category";
  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log(result);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(result);
  });
})

// ------------- post Data checkouts --------------------
app.post("/checkout", function (req, res) {
  let products = req.body.products;
  let dataContact = req.body.contact;

  if (!products || !dataContact) {
    res.status(400).json({ error: "invalid parameters" });
    return
  }

  let valid = true

  for (let i = 0; i < products.length; i++) {
    let productId = products[i].id;
    console.log("1", productId)
    //check db
    let product = "SELECT * FROM `products` where `id` = '" + productId + "'";
    con.query(product, function (err, result) {

    });
    !product ? valid = false : valid = true;
  }

  if (!valid) {
    return res.status(400).json({

    })
  } else {
    let phoneNumer = dataContact.phoneNumber;

    let sql = "INSERT INTO `receipt`(`fullName`, `phoneNumber`, `address`, `addressDetail`, `email`, `created_Date`, `description`) VALUES ('" + dataContact.fullName + "', '" + dataContact.phoneNumber + "', '" + dataContact.address + "', '" + dataContact.addressDetail + "', '" + dataContact.email + "', '" + dataContact.created_Date + "', '" + dataContact.description + "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
    });


    for (let i = 0; i < products.length; i++) {
      let insertOrderDetail = "INSERT INTO `receiptdetail`(`phoneCustomer`, `productId`, `quantity`, `status`) VALUES ('" + phoneNumer + "', '" + products[i].id + "', '" + products[i].quantity + "', '" + req.body.status + "')"

      if (!phoneNumer) {
        break;
      } else {
        con.query(insertOrderDetail, function (err, result) {
          if (err) throw err;

        });
        continue;
      }
    }
  }
})

// -------------get products with category-------------
app.get("/products/category/:id", function (req, res) {
  var sql = "SELECT * FROM `products` WHERE `idcategory` = '" + req.params.id + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("4" + result);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(result);
  })
})

// -------------login-------------
app.post('/login', function (req, res) {

  var name = req.body.ten;
  var psw = req.body.matkhau;
  var role = req.body.role;
  var sql = "SELECT * FROM `users` where name = '" + name + "' and  password = '" + psw + "' ";
  console.log("a " + sql);
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("b " + result);

    res.send(result);
  });
})

app.listen(8080, () => {
  console.log("success!");
}
)