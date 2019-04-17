import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { APP_SECRET } from '../../config';
import { validateUser } from '../../utils/util';

async function signup(_, { input }, ctx, info) {
  const { value, error } = validateUser(input);

  if (error) {
    throw new Error(error.message);
  }

  const password = await bcrypt.hash(value.password, 10);
  const user = await ctx.models.auth.create({
    email: value.email,
    password
  });

  console.log('APP Secret: ', APP_SECRET);

  const token = jwt.sign({ userId: user._id }, APP_SECRET);

  return {
    token,
    user: {
      _id: user._id,
      email: user.email
    }
  };
}

async function login(_, { input }, ctx, info) {
  const { value, error } = validateUser(input);

  if (error) {
    throw new Error(error.message);
  }

  const user = await ctx.models.auth.findOne({ email: value.email });

  if (!user) {
    throw new Error('No user found');
  }

  const matches = await bcrypt.compare(value.password, user.password);

  if (!matches) {
    throw new Error('Email and password do not match');
  }

  const token = jwt.sign({ userId: user._id }, APP_SECRET);

  return {
    token,
    user: {
      _id: user._id,
      email: user.email
    }
  };
}

export default {
  Mutation: {
    signup,
    login
  }
};
