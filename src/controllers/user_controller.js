import jwt from 'jwt-simple';
// import dotenv from 'dotenv';
import User from '../models/user_model';

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

// note the lovely destructuring here indicating that we are passing in an object with these 3 keys
export const signup = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  const { username } = req.body;
  if (!email || !password || !username) {
    console.log(email);
    console.log(password);

    res.status(500).send({ error: 'You must provide Email, Username and Password' });
  }

  // See if a user with the given email exists
  User.findOne({ email })
    .then((result) => {
      if (result) {
        console.log('email in use');
        res.status(500).send({ error: 'Email already in Use' });
      } else {
      // 🚀 TODO:
      // here you should use the User model to create a new user.
      // this is similar to how you created a Post
      // and then save and return a token
        const user = new User();
        user.email = email;
        user.username = username;
        user.password = password;
        user.save();
        res.json({ token: tokenForUser(user), email: user.email });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
