import React from "react";
import "@aws-amplify/ui-react/styles.css";
import AuthenticatorWrapper from "@/components/authenticator";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>      
        <AuthenticatorWrapper>
          {children}
        </AuthenticatorWrapper>
    </div>
    );
}