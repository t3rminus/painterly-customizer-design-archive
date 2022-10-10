import nc from 'next-connect';
import { dbMiddleware } from './db';

export default (methods) => {
  const handler = nc();
  handler.use(dbMiddleware);

  for(const method in methods) {
    if(handler[method]) {
      handler[method](methods[method]);
    }
  }

  return handler;
};