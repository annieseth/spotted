/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      friend1
      friend1avil
      friend2
      friend2avil
      friend3
      friend3avil
      name
      availability
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        friend1
        friend1avil
        friend2
        friend2avil
        friend3
        friend3avil
        name
        availability
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      inviteeUsername
      location
      meetTime
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        inviteeUsername
        location
        meetTime
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getFriendRequest = /* GraphQL */ `
  query GetFriendRequest($id: ID!) {
    getFriendRequest(id: $id) {
      id
      fromUser
      toUser
      toUserResponse
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listFriendRequests = /* GraphQL */ `
  query ListFriendRequests(
    $filter: ModelFriendRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriendRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fromUser
        toUser
        toUserResponse
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getByUsername = /* GraphQL */ `
  query GetByUsername(
    $username: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        friend1
        friend1avil
        friend2
        friend2avil
        friend3
        friend3avil
        name
        availability
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getIfF1 = /* GraphQL */ `
  query GetIfF1(
    $friend1: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getIfF1(
      friend1: $friend1
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        friend1
        friend1avil
        friend2
        friend2avil
        friend3
        friend3avil
        name
        availability
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getIfF2 = /* GraphQL */ `
  query GetIfF2(
    $friend2: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getIfF2(
      friend2: $friend2
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        friend1
        friend1avil
        friend2
        friend2avil
        friend3
        friend3avil
        name
        availability
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getIfF3 = /* GraphQL */ `
  query GetIfF3(
    $friend3: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getIfF3(
      friend3: $friend3
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        friend1
        friend1avil
        friend2
        friend2avil
        friend3
        friend3avil
        name
        availability
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getReqByToUser = /* GraphQL */ `
  query GetReqByToUser(
    $toUser: String
    $sortDirection: ModelSortDirection
    $filter: ModelFriendRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getReqByToUser(
      toUser: $toUser
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        fromUser
        toUser
        toUserResponse
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
