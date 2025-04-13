import type {
  Person,
  CreatePerson,
} from "../CampRegistration/campRegistration.types";

interface Volunteer {
  id: number;
  personId: number;
  person: Person;
  driversLicense: string;
  firstAid: string;
  experience: string;
  motivation: string;
  properties: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface CreateVolunteer {
  person: CreatePerson;
  driversLicense: string;
  firstAid: string;
  experience: string;
  motivation: string;
  properties: string;
}

interface EditVolunteer {
  person: Person;
  driversLicense: string;
  firstAid: string;
  experience: string;
  motivation: string;
  properties: string;
}

export type { Volunteer, CreateVolunteer, EditVolunteer };
