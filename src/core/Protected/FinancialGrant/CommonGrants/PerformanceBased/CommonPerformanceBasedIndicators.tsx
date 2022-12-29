import React from 'react';
import { useParams } from 'react-router-dom';
import FedToLocalPerformanceBasedIndicators from '../../FedLocal/PerformanceBased/FedToLocalPerformanceBasedIndicators';
import PerformanceBased from '../../PerformanceBased/PerformanceBased';

const CommonPerformanceBasedIndicators = () => {
  const { name } = useParams();
  return (
    <>
      {name === 'gov_prov' && <PerformanceBased />}
      {name === 'gov_localbody' && <FedToLocalPerformanceBasedIndicators />}
    </>
  );
};

export default CommonPerformanceBasedIndicators;
