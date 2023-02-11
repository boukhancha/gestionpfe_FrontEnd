export class Subject {
  id?: number;
  supervisor?: number;
  subject?: string;
  description?: string;
  groupNumber?: number;
  published?: boolean;
  studentGroups?: Array<any>;
  supervisorObject?: any;
}
