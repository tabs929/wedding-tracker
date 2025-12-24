export interface Member {
  name: string;
  gender: 'male' | 'female';
  attending: boolean;
}

export type EventType = 'Engagement' | 'Devkarya' | 'Sangeet' | 'Marriage morning' | 'Marriage afternoon';

export interface Family {
  _id: string;
  familyName: string;
  event?: EventType;
  members: Member[];
  createdAt: string;
  updatedAt: string;
}

export interface Statistics {
  totalFamilies: number;
  totalGuests: number;
  totalMen: number;
  totalWomen: number;
  totalAttending: number;
  totalNotAttending: number;
}

export interface FamilyFormData {
  familyName: string;
  event: EventType;
  members: Member[];
}
