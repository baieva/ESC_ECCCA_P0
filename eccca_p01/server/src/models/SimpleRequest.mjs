//import your db here
//import { DB } from '../../db/db';
import uuidv4 from 'uuid/v4';

export async function createUser(attrs, options = {}) {
  const checkEmail = await listUsers({ email: attrs.email });
  if (checkEmail.length != 0) {
    return {
      result: 0,
      msg: 'email already used',
    };
  }
  const { salt, hash } = await genHash({ password: attrs.password });
  const userAttr = {
    username: attrs.username,
    imagePath: attrs.imagePath,
    hash,
    salt,
  };
  if (!userAttr.userId) userAttr.userId = uuidv4();
  try {
    // await DB('user').insert(userAttr);
    // await DB('email').insert({
    //   emailId: uuidv4(),
    //   email: attrs.email,
    //   verified: 0,
    //   primary: 1,
    //   userID: userAttr.userId,
    // });
    // delete userAttr.salt;
    // delete userAttr.hash;
    return { status: 'ok', user: userAttr };
  } catch (e) {
    return { status: 'failed', msg: 'failed to create new user ' };
  }
}
