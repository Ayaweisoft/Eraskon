import { IFeedback } from '@/interfaces';
import { models, model, Schema, Mongoose } from 'mongoose';

const FeedbackSchema: Schema = new Schema<IFeedback>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    // required: true,
  },
  type: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});


const FeedbackModel = models.Feedback || model('Feedback', FeedbackSchema);


export default FeedbackModel