import { Types } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
export const DatabaseDefaultObjectId = () => new Types.ObjectId();
export const DatabaseDefaultUUID = uuidV4();
