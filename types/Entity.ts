import {Timestamp} from 'firebase/firestore';

interface Entity {
  id?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export default Entity;
