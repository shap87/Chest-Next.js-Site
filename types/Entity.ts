import {FieldValue} from 'firebase/firestore';

interface Entity {
  id?: string;
  createdAt?: Date | FieldValue;
  updatedAt?: Date | FieldValue;
}

export default Entity;
