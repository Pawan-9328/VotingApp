const express = require('express');
const router = express.Router();
const User = require('./../models/user.models.js')
const { jwtAutMiddleware, generateToken } = require('./../jwt')

//POST route to add a person
router.post('./signup', async (req, res) => {
     try {
          const data = req.body; // Assuming the request body contains the person data 

          // Create a new User document using the Mongoose model
          const newUser = new User(data);

          //Save the new user to the database
          const response = await newUser.save();
          console.log('data-saved');

          // send id through payload....
          const payload = {
               id: response.id,


          }
          console.log(JSON.stringify(payload));
          const token = generateToken(payload);
          console.log("Token is : ", token);

          res.status(200).json({ response: response, token: token });



     }
     catch (err) {
          console.log(err);
          res
               .status(500).json({ error: 'Internal Server Error' });

     }
})

// Login Route 
router.post('/login', async (req, res) => {
     try {
          // Extract aadharCardNumber and password from request body 
          const { aadharCardNumber, password } = req.body;

          //Find the user by aadharcardNumber 
          const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

          //If user does not exits or password does not match, return error
          if (!user || !(await user.comparePassword(password))) {
               return res.status(401).json({ error: 'Invalid username and password' });
          }

          // generate Token 
          const payload = {
               id: user.id,

          }
          const token = generateToken(payload);
          //return token as response

          res.json({ token })
     } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Internal Server Error' });
     }
})

//Profile route 

router.get('/profile', jwtAutMiddleware, async (req, res) => {
     try {
          const userData = req.user;
          const userId = userData.id;
          const user = await User.findById(userId);
          res.status(200).json({ user });
     } catch (error) {
          console.log(error);
          res.status(500).json(({ error: 'Internal Server Error' }));
     }
})

router.put('profile/password', jwtAutMiddleware, async (req, res) => {
     try {

          const userId = req.body; //Extract the id from the URL parameter   
          const { currentPassword, newPassword } = req.body;
          // Find the user by userID
          const user = await User.findById(userId);

          //If password does not match, return error
          if (!(await user.comparePassword(currentPassword))) {
               return res.status(401).json("error: 'Invalid username or password ");
          }
          // Uppdate the user's password 
          user.password = newPassword;
          await user.save();
          console.log('Password Updated');
          res.status(200).json({ message: 'password Updated' });

     } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Internal Server Error' });

     }
})

module.exports = router;
