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
