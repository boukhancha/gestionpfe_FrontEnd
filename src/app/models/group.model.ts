import {Student} from "./student.model";

export class Group {
  id?: number;
  students?: Array<number>;
  subject?: number;
  studentGroupState?: string;
  driveUrl?: string;
  studentsObjects?: Array<Student>;
  driveUrlPublished?: boolean;
}
