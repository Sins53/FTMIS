import Layout from '@/components/layout';
import React from 'react';
import { useParams } from 'react-router-dom';
import FedToLocalMinimumGrant from '../FedLocal/MinimumGrant/FedToLocalMinimumGrant';
import MinimumGrantView from '../MinimumGrant/MinimumGrantView';
import ProvToLocalMinimumGrant from '../ProvLocal/MinimumGrant/ProvToLocalMinimumGrant';

const CommonMinimumGrant = () => {
  const { name } = useParams();
  return (
    <Layout.Main>
      {name === 'gov_prov' && <MinimumGrantView />}
      {name === 'gov_localbody' && <FedToLocalMinimumGrant />}
      {name === 'prov_localbody' && <ProvToLocalMinimumGrant />}
    </Layout.Main>
  );
};

export default CommonMinimumGrant;
