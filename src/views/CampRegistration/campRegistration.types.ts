interface Person {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  gender: string;
  mobile: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  emergencyContact: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface CampRegistration {
  id: number;
  personId: number;
  person: Person;
  payments: Payment[];
  year: number;
  study: string;
  shirtSize: string;
  comments: string;
  attendance: string;
  insurance: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface Payment {
  id: number;
  campRegistrationId: number;
  campRegistration: CampRegistration;
  typeOfPayment: string;
  transactionId: string;
  amount: number;
  state: string;
  accountName: string;
  accountNumber: string;
  accountCity: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface EditRegistration {
  shirtSize: string;
}

export type { Person, CampRegistration, Payment, EditRegistration };
