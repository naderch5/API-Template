import { Project } from "./project.model";

export interface Contrat {
    idContrat: number;
    period: Date;
    amount: number;
    interest: number;
    partName: string;
    project: Project; // Supposons que vous ayez une interface Project correspondant au modèle Project
  }