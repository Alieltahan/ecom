import { text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';

const config = require('config');

const cloudi = config.get('Cloudinary');

export const cloudinary = {
  cloudName: cloudi.NAME,
  apiKey: cloudi.KEY,
  apiSecret: cloudi.SECRET,
  folder: 'ecom',
};

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
  },
});
