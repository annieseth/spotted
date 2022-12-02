/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
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
      toUser
      fromUser
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
        toUser
        fromUser
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
export const getEventByToUser = /* GraphQL */ `
  query GetEventByToUser(
    $toUser: String
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getEventByToUser(
      toUser: $toUser
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        toUser
        fromUser
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
