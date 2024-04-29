export interface Recovery {
    id: number; // ID of the recovery entry
    amountRecovered: number; // Amount recovered
    date: Date; // Date of the recovery
    state: string; // State of the recovery (e.g., "pending", "completed", etc.)
    creditId: number; // ID of the associated credit
  }
  