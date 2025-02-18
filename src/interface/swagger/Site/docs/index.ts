import { authDocs } from './auth';
import { categoryDocs } from './category';
import { productDocs } from './product';
import { postDocs } from './post';
import { addressDocs } from './address';
export const docs = {
  paths: {
    ...authDocs,
    ...productDocs,
    ...categoryDocs,
    ...postDocs,
    ...addressDocs,
  },
};
