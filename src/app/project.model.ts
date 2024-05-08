import { ProjectRequest } from "./project-request.model";

export enum ProjectType {
    TYPE1 = 'Type 1',
    TYPE2 = 'Type 2',
    TYPE3 = 'Type 3'
  }
  
  export interface Project {
    idProject: number;
    name: string;
    description: string;
    etat: string;
    ptype: ProjectType;
    projectRequest: ProjectRequest;
  }
  
  

