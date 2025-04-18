// This file is auto-generated by @hey-api/openapi-ts

export type request_CampyearRequest = {
    end: string;
    insuranceFee?: number;
    participationFee: number;
    start: string;
    year: number;
};

export type request_RegistrationRequest = {
    accountCity?: string;
    accountName?: string;
    accountNumber?: string;
    address: string;
    city: string;
    comment?: string;
    dateOfBirth: string;
    email: string;
    emergencyContact: string;
    firstName: string;
    gender: 'm' | 'v' | 'nb';
    insurance?: boolean;
    lastName: string;
    paymentMethod: 'ideal' | 'incasso';
    phone: string;
    shirtSize: 'XS' | 'S' | 'M' | 'L' | 'XL';
    study: 'hbo-ict' | 'cmd' | 'ads-ai';
    termsConditions: boolean;
    zipCode: string;
};

export type request_UpdateCampyearRequest = {
    end?: string;
    insuranceFee?: number;
    participationFee?: number;
    start?: string;
};

export type request_UpdateParticipantRequest = {
    attendance?: 'open' | 'closed';
};

export type request_UpdatePaymentRequest = {
    payment_status?: 'paid';
};

export type response_CampyearResponse = {
    active?: boolean;
    end?: string;
    insuranceFee?: number;
    open?: boolean;
    participationFee?: number;
    start?: string;
    year?: number;
};

export type response_ParticipantResponse = {
    email?: string;
    first_name?: string;
    id?: number;
    last_name?: string;
};

export type response_ParticipantWithLatestPaymentResponse = {
    email?: string;
    first_name?: string;
    id?: number;
    last_name?: string;
    payment?: response_PaymentResponse;
};

export type response_PaymentResponse = {
    account_city?: string;
    account_name?: string;
    account_number?: string;
    amount?: number;
    id?: number;
    payment_id?: string;
    payment_method?: string;
    payment_status?: string;
};

export type GetAllCampyearsResponse = (Array<response_CampyearResponse>);

export type GetAllCampyearsError = (string);

export type CreateCampyearData = {
    /**
     * Campyear object to be created
     */
    body: request_CampyearRequest;
};

export type CreateCampyearResponse = (response_CampyearResponse);

export type CreateCampyearError = (string);

export type GetCampyearData = {
    path: {
        /**
         * Year of the campyear
         */
        year: number;
    };
};

export type GetCampyearResponse = (response_CampyearResponse);

export type GetCampyearError = (string);

export type UpdateCampyearData = {
    /**
     * Updated campyear object
     */
    body: request_UpdateCampyearRequest;
    path: {
        /**
         * Year of the campyear
         */
        year: number;
    };
};

export type UpdateCampyearResponse = (response_CampyearResponse);

export type UpdateCampyearError = (string);

export type DeleteCampyearData = {
    path: {
        /**
         * Year of the campyear
         */
        year: number;
    };
};

export type DeleteCampyearResponse = (string);

export type DeleteCampyearError = (string);

export type ActivateCampyearData = {
    path: {
        /**
         * Year of the campyear
         */
        year: number;
    };
};

export type ActivateCampyearResponse = (string);

export type ActivateCampyearError = (string);

export type CloseCampyearData = {
    path: {
        /**
         * Year of the campyear
         */
        year: number;
    };
};

export type CloseCampyearResponse = (string);

export type CloseCampyearError = (string);

export type OpenCampyearData = {
    path: {
        /**
         * Year of the campyear
         */
        year: number;
    };
};

export type OpenCampyearResponse = (string);

export type OpenCampyearError = (string);

export type ExportParticipantsResponse = ((Blob | File));

export type ExportParticipantsError = (string);

export type GetAllParticipantsResponse = (Array<response_ParticipantWithLatestPaymentResponse>);

export type GetAllParticipantsError = (string);

export type GetParticipantData = {
    path: {
        /**
         * ID of the participant
         */
        id: number;
    };
};

export type GetParticipantResponse = (response_ParticipantResponse);

export type GetParticipantError = (string);

export type UpdateParticipantData = {
    /**
     * Updated participant object
     */
    body: request_UpdateParticipantRequest;
    path: {
        /**
         * ID of the participant
         */
        id: number;
    };
};

export type UpdateParticipantResponse = (response_ParticipantResponse);

export type UpdateParticipantError = (string);

export type DeleteParticipantData = {
    path: {
        /**
         * ID of the participant
         */
        id: number;
    };
};

export type DeleteParticipantResponse = (string);

export type DeleteParticipantError = (string);

export type UpdatePaymentData = {
    /**
     * Updated payment object
     */
    body: request_UpdatePaymentRequest;
    path: {
        /**
         * ID of the payment
         */
        id: number;
    };
};

export type UpdatePaymentResponse = (response_PaymentResponse);

export type UpdatePaymentError = (string);

export type CreateRegistrationData = {
    /**
     * Registration object to be created
     */
    body: request_RegistrationRequest;
};

export type CreateRegistrationResponse = (string);

export type CreateRegistrationError = (string);