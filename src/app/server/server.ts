

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const bcrypt = require('bcrypt');


app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'userinfo',
  port: 3306,
});

db.connect((err: Error | null) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Database Connected Succcessful!');
  }
});

//tworzy recordy, register

app.post('/api/users/add', async (req: any, res: any) => {
  let details = {
    fullname: req.body.fullname,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    zipcode: req.body.zipcode,
    phonenumber: req.body.phonenumber,
    password: req.body.password,
  };
  const hash = await bcrypt.hash(details.password, 13);

  let user_details = {
    ...details,
    password: hash,
  };

  let sql = 'INSERT INTO users SET ?';
  db.query(sql, user_details, (error: any) => {
    if (error) {
      res.status(500).send({ status: false, message: 'Database insertion error', error });
    } else {
      res.send({ status: true, message: 'Created successfully' });
    }
  });
});



//wyswietla recordy

app.get('/api/users', (req: any, res: any) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (error: any, result: any) => {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//szuka recordy

app.get('/api/users/:id', (req: any, res: any) => {
  const userid = req.params.id;
  const sql = 'SELECT * FROM users WHERE id=' + userid;
  db.query(sql, (error: any, result: any) => {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//uptade recordy

app.put('/api/users/update/:id', (req: any, res: any) => {
  let sql =
    "UPDATE users SET fullname='" +
    req.body.fullname +
    "', email='" +
    req.body.email +
    "', address='" +
    req.body.address +
    "', city='" +
    req.body.city +
    "', zipcode='" +
    req.body.zipcode +
    "', phonenumber='" +
    req.body.phonenumber +
    "', password='" +
    req.body.password +
    "' WHERE id=" + req.params.id;

  let query = db.query(sql, (error: any, result: any) => {
    if (error) {
      res.send({ status: false, message: 'Update Failed' });
    } else {
      res.send({ status: true, message: 'Update successfully' });
    }
  });
});

//uptade hasla
app.put('/api/users/update/password/:id', async (req: any, res: any) => {
  const userId = req.params.id;
  const newPassword = req.body.password;

  const hashedPassword = await bcrypt.hash(newPassword, 13);

  let sql =
    "UPDATE users SET password= ? WHERE id = ?"

    let values = [hashedPassword, userId];

  let query = db.query(sql, values, (error: any, result: any) => {
    if (error) {
      res.send({ status: false, message: 'Update Failed' });
    } else {
      res.send({ status: true, message: 'Update successful' });
    }
  });
});

// usuwanie recordy
app.delete('/api/users/delete/:id', (req: any, res: any) => {
  let sql = 'DELETE FROM users WHERE id=' + req.params.id + '';
  let query = db.query(sql, (error: any) => {
    if (error) {
      res.send({ status: false, message: 'User Delated Failed' });
    } else {
      res.send({ status: true, message: 'User Delated Successfuly' });
    }
  });
});

//sprawdza czy logowanie pasuje do DB

app.post("/api/users/login", async (req: any, res: any) => {
  let userLoginDetails = {
    useremail: req.body.email,
    userpassword: req.body.password
  };

  let sql = "SELECT * FROM users WHERE email = ?";
  let query = db.query(sql, [userLoginDetails.useremail], async (error: any, results: any) => {
    if (error) {
      res.status(500).send({ status: false, message: "Login Failed", error });
    } else {
      if (results.length > 0) {
        const user = results[0];
        try {
          const passwordMatch = await bcrypt.compare(userLoginDetails.userpassword, user.password);
          if (passwordMatch) {
            const { id, fullname, address, city, zipcode, phonenumber } = user;
            
            res.send({ status: true, message: "Login successful" , userData: user});
          } else {
            res.send({ status: false, message: "Incorrect password" });
          }
        } catch (error) {
          res.status(500).send({ status: false, message: "An error occurred", error });
        }
      } else {
        res.send({ status: false, message: "User not found" });
      }
    }
  });
});

//sprawdza czy hasla sa poprawne
app.post('/api/users/checkpassword/:id', async (req: any, res: any) => {
  const userId = req.params.id;
  const currentPassword = req.body.currentPassword;

  const sql = 'SELECT password FROM users WHERE id = ?';
  db.query(sql, [userId], async (error: any, results: any) => {
    if (error) {
      res.status(500).send({ status: false, message: 'Error fetching password', error });
    } else {
      if (results.length === 1) {
        const userPasswordHash = results[0].password;

        
        const passwordMatch = await bcrypt.compare(currentPassword, userPasswordHash);

        if (passwordMatch) {
          res.send({ status: true, message: 'Current password is valid' });
        } else {
          res.send({ status: false, message: 'Current password is not valid' });
        }
      } else {
        res.status(404).send({ status: false, message: 'User not found' });
      }
    }
  });
});


//tworzy recordy dla products
app.post('/api/products/add', async (req: any, res: any) => {
  console.log('Otrzymano żądanie POST na endpoint /api/products/add:', req.body);

  
  if (!Array.isArray(req.body)) {
    return res.status(400).send({ status: false, message: 'Invalid request body' });
  }

 
  for (const productData of req.body) {
    let details = {
      name: productData.name,
      price: productData.price.value,
      quantity: productData.quantity,
      userId: productData.userId,
      status: 'realizowanie'
    };

    console.log('Dane do wstawienia do bazy danych:', details);

    let sql = 'INSERT INTO PRODUCTS SET ?';

   
    db.query(sql, details, (error: any) => {
      if (error) {
        console.error('Błąd podczas wstawiania do bazy danych:', error);
      }
    });
  }

  res.send({ status: true, message: 'Created successfully' });
});


// wyswietla recordy products
app.get('/api/products', (req: any, res: any) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (error: any, result: any) => {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//szuka recordy products do wyswietlenia

app.get('/api/products/user/:userId', (req: any, res: any) =>{

  const userId = req.params.userId
  const sql = "SELECT * FROM PRODUCTS WHERE userId = ?"
  db.query(sql, [userId], (error:any , results: any) =>{
    if (error) {
      res.status(500).send({ status: false, message: 'Error fetching products' });
    } else {
      res.send({ status: true, data: results });
    }
  })
    
})
//usuwanie recordy products
app.delete('/api/products/delete/:id', (req: any, res: any) => {
  let sql = 'DELETE FROM products WHERE id=' + req.params.id + '';
  let query = db.query(sql, (error: any) => {
    if (error) {
      res.send({ status: false, message: 'Product Delated Failed' });
    } else {
      res.send({ status: true, message: 'Product Delated Successfuly' });
    }
  });
});



app.listen(3000, () => {
  console.log('Server is running on 3000 PORT');
});
