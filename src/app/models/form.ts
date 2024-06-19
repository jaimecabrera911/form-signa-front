import { Project } from './project';

  export interface Form {
    id?: number;
    uid: string;
    name: string;
    version: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    code: string;
    fields: Field[];
    evidences: any;
    project: Project;
    assistants?: any[];
  }

  export interface Field {
    id: number;
    name: string;
    type: string;
    value: string;
  }
