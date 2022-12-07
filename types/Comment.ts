import Entity from './Entity';

interface Comment extends Entity {
  id: string;
  userId: string;
  comment: string;
}

export default Comment;
