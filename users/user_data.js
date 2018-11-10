import { Mongo } from 'meteor/mongo';

const User_data = new Mongo.Collection("user_data");

export default User_data;