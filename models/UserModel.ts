import { models, model, Schema } from 'mongoose';
const bcrypt = require('bcrypt');


const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

//compare password
UserSchema.methods.comparePassword = async function comparePassword(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const UserModel = models.User || model('User', UserSchema);



export default UserModel