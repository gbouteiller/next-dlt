/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('./auth/lucia').Auth;
  type DatabaseUserAttributes = {
    avatar: string;
    email: string;
    forename: string;
    surname: string;
  };
  type DatabaseSessionAttributes = {};
}
