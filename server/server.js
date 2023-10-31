const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config()

const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());

// Create a schema for administrators
const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Admin = mongoose.model('Admin', adminSchema);

// Create a schema for quizzes
const quizSchema = new mongoose.Schema({
  name :String,
  AdminId :String,
  type:String,
  date:String,
  impressions:String,
  urlPath:String,
  questions:[{
      id:String,
      questions:String,
      optionType:String,
      timer:Number,
      options:[{
          text:String,
          imageLink:String,
          isCorrect:Boolean,
          numberCount:Number,
      },],
  },],
  attempted:Number,
  correctAnswer:Number,
});
const Quiz = mongoose.model('Quiz', quizSchema);

app.get('/',(req,res)=>{
    res.send({
        status:"success",
        message:"all good"
    })
})
function sendErrorResponse(res, status, message) {
  res.status(status).send({ status: 'FAIL', message });
}

app.get('/', (req, res) => {
  res.send({
      status: 'success',
      message: 'All good',
  });
});

app.post('/api/signup', async (req, res) => {
  try {
      const { name, email, password } = req.body;
      const isEmailTaken = await Admin.findOne({ email: email.toLowerCase() });

      if (isEmailTaken) {
          throw 'Email already in use';
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = {
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
      };

      const createdAdmin = await Admin.create(newAdmin);

      const jwtToken = jwt.sign({ newAdmin }, process.env.JWT_SECRET_KEY, {
          expiresIn: '15d',
      });

      res.status(201).send({
          status: 'SUCCESS',
          message: 'Account successfully created',
          data: { jwtToken, admin: { id: createdAdmin._id } },
      });
  } catch (error) {
      sendErrorResponse(res, 400, error);
  }
});

app.post('/api/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const existingAdmin = await Admin.findOne({
          email: email.toLowerCase(),
      });

      if (existingAdmin) {
          const hashedPassword = existingAdmin.password;
          const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

          if (isPasswordCorrect) {
              const jwtToken = jwt.sign(
                  { existingAdmin },
                  process.env.JWT_SECRET_KEY,
                  {
                      expiresIn: '15d',
                  }
              );

              res.status(200).send({
                  status: 'SUCCESS',
                  message: 'Login Successful',
                  data: { jwtToken, admin: { id: existingAdmin._id } },
              });
          } else {
              throw 'Incorrect password';
          }
      } else {
          throw 'Admin not found';
      }
  } catch (error) {
      sendErrorResponse(res, 400, error);
  }
});

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
      app.listen(process.env.PORT, () => {
          console.log(`Server is running on http://localhost:${process.env.PORT}`);
      });
  })
  .catch((error) => console.log(error));
// app.post("/api/signup", async (req, res) => {
//     try {
//       const { name, email, password } = req.body
//       const isEmail = await admin.findOne({ email: email.toLowerCase() })
      
//       if (isEmail) {
//         throw "Email already in use"
//       }
  
//       const hashedPassword = await bcrypt.hash(password, 10)
  
  
//       const newAdmin = {
//         name,
//         email: email.toLowerCase(),
//         password: hashedPassword,
//       }
  
//       const createdAdmin = await admin.create(newAdmin)
//       console.log("Admin Details1:", createdAdmin)
  
//       const jwtToken = jwt.sign({ newAdmin }, process.env.JWT_SECRET_KEY, {
//         expiresIn: "15d",
//       })
  
//       console.log("Admin Details2:", createdAdmin)
  
//       res.status(201)
//       res.send({
//         status: "SUCCESS",
//         message: "Account successfully created",
//         data: { jwtToken, admin: { id: createdAdmin._id } },
//       })
//     } catch (error) {
    
//       res.status(400)
//       res.send({ status: "FAIL", message: error })
//     }
//   })
  
//   app.post("/api/login", async (req, res) => {
//     try {
//       const { email, password } = req.body
//       const existingAdmin = await admin.findOne({
//         email: email.toLowerCase(),
//       })
//       console.log(existingAdmin)
  
//       if (existingAdmin) {
//         const hashedPassword = existingAdmin.password
//         const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)
  
//         if (isPasswordCorrect) {
//           const jwtToken = jwt.sign(
//             { existingAdmin },
//             process.env.JWT_SECRET_KEY,
//             {
//               expiresIn: "15d",
//             }
//           )
  
//           res.status(200)
//           res.send({
//             status: "SUCCESS",
//             message: "Login Successful",
//             data: { jwtToken, Admin: { id: existingAdmin._id } },
//           })
//         } else {
//           throw "Incorrect password"
//         }
//       } else {
//         throw "Admin not found"
//       }
//     } catch (error) {
//       res.status(400)
//       res.send({
//         status: "FAIL",
//         message: error,
//       })
//     }
//   })

// app.listen(process.env.PORT,()=>{
//     mongoose.connect(process.env.MONGODB_URL)
//     .then(()=>{
//         console.log(`server is running on http://localhost:${process.env.PORT}`)
//     }).catch((error)=>console.log(error))

// })