//import { requireAuth, logout, authenticateUser } from '../auth';
import * as User from '../../models/SimpleRequest';

async function createUser(ctx, next) {
  const data = ctx.request.body;
  const result = await User.createUser(data);
  if (result.status === 'ok') {
    ctx.state.user = result.user;
    await ctx.logIn(result.user);
    await next();
  } else {
    ctx.status = 422;
    ctx.body = result;
  }
}

async function outputUser(ctx) {
  if (ctx.state.user) {
    ctx.body = ctx.state.user;
  } else {
    ctx.status = 404;
  }
}

const api = router => {
  //take this as a example
  router.post('/api/users', createUser, outputUser);

  //* is all other path
  router.get('*', ctx => {
    ctx.body = 'Hello World!';
  });
};

export default { api };
