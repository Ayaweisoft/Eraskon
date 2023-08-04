import { ICms } from '@/interfaces';
import { models, model, Schema } from 'mongoose';

const CmsSchema: Schema = new Schema<ICms>({
  hero: {
    header: {
      type: String,
      // required: true,
    },
    text: {
      type: String,
      // required: true
    },
    image: {
      type: Array<String>(),
      default: []
      // required: true
    },
  },
  whoWeAre: {
    text: {
      type: String,
      // required: true
    },
    image: {
      type: String,
      // required: true
    },
  },
  whatWeDo: {
    text: {
      type: String,
      // required: true
    },
    image: {
      type: String,
      // required: true
    },
  }
}, {
  timestamps: true
});

const CmsModel = models.Cms || model('Cms', CmsSchema);


export default CmsModel