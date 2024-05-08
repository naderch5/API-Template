import { CreditRequest } from './credit-request.model';
export interface Credit {
    idCredit: number;            // Unique identifier for the credit
    amount: number;        // Amount of the credit
    interestRate: number;  // Interest rate for the credit
    startDate: Date;       // Start date of the credit
    deadline: Date;        // Deadline for the credit
    autoFinance: number;
    creditRequest  : CreditRequest;  // Auto finance amount for the credit
    // Add more properties as needed
  }
  
