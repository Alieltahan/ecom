/* eslint-disable @typescript-eslint/no-unsafe-call */
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('config');

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const cloudi = config.get('Cloudinary');

export const cloudinary = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  cloudName: cloudi.NAME,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  apiKey: cloudi.KEY,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
    product: relationship({ ref: 'Product.photo' }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'product'],
    },
  },
});
