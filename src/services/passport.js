import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';

import User from '../models/user_model';

// loads in .env file if needed
dotenv.config({ silent: true });

// options for local strategy, we'll use email AS the username
// not have separate ones
const localOptions = { usernameField: 'email' };

// options for jwt strategy
// we'll pass in the jwt in an `authorization` header
// so passport can find it there
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.AUTH_SECRET,
};
// NOTE: we are not calling this a bearer token (although it technically is), if you see people use Bearer in front of token on the internet you could either ignore it, use it but then you have to parse it out here as well as prepend it on the frontend.

// username/email + password authentication strategy
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  // should find user by email and check password
  let user;
  let isMatch;

  try {
    user = await User.findOne({ email });
    console.log(user);
    isMatch = await user.comparePassword(password);
  } catch (error) {
    return done(error);
  }

  if (!user) {
    // if user cannot be found based on whether the email exists, then false!
    return done(null, false);
  } else if (!isMatch) {
    // if email was found in the database, but the password does not match, false! No permission.
    return done(null, false);
  } else {
    // if email exists, is entered and password matches, then return user!
    return done(null, user);
  }
});

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  let user;
  try {
    user = await User.findById(payload.sub);
  } catch (error) {
    // if User.findbyId does not return i.e. payload.sub is null, or results in error then false!
    done(error, false);
  }
  // if user was found by user ID and the found user is returned, then return the user
  if (user) {
    done(null, user);
    //  if the user was not found, then false too!
  } else {
    done(null, false);
  }
});

// Tell passport to use this strategy
passport.use(jwtLogin); // for 'jwt'
passport.use(localLogin); // for 'local'

// middleware functions to use in routes
export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireSignin = passport.authenticate('local', { session: false });
