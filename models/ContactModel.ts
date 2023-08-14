import { IContactUs } from '@/interfaces';
import { models, model, Schema } from 'mongoose';

const ContactSchema: Schema = new Schema<IContactUs>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});


const ContactModel = models.Contact || model('Contact', ContactSchema);


export default ContactModel