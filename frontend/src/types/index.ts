export interface Member {
  name: string;
  gender: 'male' | 'female';
  attending: boolean;
}

export interface Family {
  _id: string;
  familyName: string;
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
  members: Member[];
}
