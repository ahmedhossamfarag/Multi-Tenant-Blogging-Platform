"use client"

import { Authenticator } from "@aws-amplify/ui-react";

export default function AuthenticatorWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Authenticator formFields={{
        signUp: {
          username: {
            order: 1,
            placeholder: 'Enter your username (e.g., john-doe)',
            isRequired: true,
            label: 'Username',
            pattern: "[a-zA-Z0-9]{3,20}[a-zA-Z0-9\\-]*",
          },
        },
      }}>{children}</Authenticator>;
}