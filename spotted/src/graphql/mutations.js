/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelclientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
      id
      name
      availability
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelclientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
      id
      name
      availability
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelclientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
      id
      name
      availability
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModeleventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      who
      when
      where
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModeleventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      who
      when
      where
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModeleventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      who
      when
      where
      createdAt
      updatedAt
      owner
    }
  }
`;
