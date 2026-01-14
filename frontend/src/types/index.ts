export interface Member {
  name: string;
  gender: 'male' | 'female';
  attending: boolean;
}

export type EventType = 'Engagement' | 'Devkarya' | 'Sangeet' | 'Marriage morning' | 'Marriage afternoon reception' | 'Night reception';

export interface Family {
  _id: string;
  familyName: string;
  events: EventType[];
  event?: EventType; // Deprecated, for backward compatibility
  members: Member[];
  createdAt: string;
  updatedAt: string;
}

export interface Statistics {
  totalFamilies: number;
  totalGuests: number;
  totalMen: number;
  totalWomen: number;
}

export interface FamilyFormData {
  familyName: string;
  events: EventType[];
  members: Member[];
}
