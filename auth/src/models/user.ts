import mongoose, { Schema } from "mongoose";

// An interface that describes the properties
// that are required to create a user
// What it takes to create a User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User document has
// what properties a SINGLE user has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a user model has
// Method associated with user model, what user collection looks like
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//with new mongoose typescript supports
// interface User {
//   email: string;
//   password: string;
//   id: string;
// }

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//adding new build function into userSchema
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

//new User.build() will create new User
//This will use typescript's type check

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
