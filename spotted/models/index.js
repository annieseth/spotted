// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Users, UsersConnection } = initSchema(schema);

export {
  Users,
  UsersConnection
};