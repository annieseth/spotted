import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type EagerUsers = {
  readonly username: string;
  readonly name?: string | null;
  readonly availability?: boolean | null;
}

type LazyUsers = {
  readonly username: string;
  readonly name?: string | null;
  readonly availability?: boolean | null;
}

export declare type Users = LazyLoading extends LazyLoadingDisabled ? EagerUsers : LazyUsers

export declare const Users: (new (init: ModelInit<Users>) => Users)

type EagerUsersConnection = {
  readonly items?: (Users | null)[] | null;
  readonly nextToken?: string | null;
}

type LazyUsersConnection = {
  readonly items?: (Users | null)[] | null;
  readonly nextToken?: string | null;
}

export declare type UsersConnection = LazyLoading extends LazyLoadingDisabled ? EagerUsersConnection : LazyUsersConnection

export declare const UsersConnection: (new (init: ModelInit<UsersConnection>) => UsersConnection)