import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { APP_SECRET } from '../../config';

async function signup(_, { input }, ctx, info) {
  console.log('Signup is Ran');
  console.log('User Email: ', input.email);
  console.log('User Password: ', input.password);

  const password = await bcrypt.hash(input.password, 10);
  const user = await ctx.models.auth.create({
    email: input.email,
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

export default {
  Mutation: {
    signup
  }
};
