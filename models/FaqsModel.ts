import { IFaqs } from '@/interfaces';
import { models, model, Schema } from 'mongoose';

const FaqsSchema: Schema = new Schema<IFaqs>({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const FaqsModel = models.Faqs || model('Faqs', FaqsSchema);


export default FaqsModel