import React from "react";
import "@aws-amplify/ui-react/styles.css";
import AuthenticatorWrapper from "@/components/authenticator";
import Header from "@/components/header/header";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>      
        <AuthenticatorWrapper>
          <Header />
          {children}
        </AuthenticatorWrapper>
    </div>
    );
}