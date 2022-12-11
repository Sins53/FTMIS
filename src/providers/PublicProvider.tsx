import React from 'react';
import { usePublicInitData } from '../genericQueries/userQuery';

export interface PublicInitResponse {
  email: string;
  phone_number: string;
  address: string;
  logo: string;
}

interface PublicContextInterface {
  public_init: null | PublicInitResponse | undefined;
}

export const PublicContext = React.createContext<PublicContextInterface>({
  public_init: null
});

interface Props {
  children: React.ReactNode;
}

export function PublicProvider(props: Props) {
  const { data: PublicData } = usePublicInitData();

  return (
    <PublicContext.Provider
      value={{
        public_init: PublicData?.data
      }}>
      {props.children}
    </PublicContext.Provider>
  );
}
