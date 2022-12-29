import StyledSelect, { OptionType } from '@/components/StyledSelect/StyledSelect';
import { generateLabelValueArray } from '@/utils/selectHelper';
import React, { useEffect, useState } from 'react';
import { useFiscalYearData } from '../MasterData/FiscalYear/fiscalYearQueries';
import { StyledYearSelector } from '../MasterData/ProvinceSetup';

interface FiscalProps {
  fiscalYear: string | number | null;
  setFiscalYear: any;
}

const CommonFiscalSelector = (props: FiscalProps) => {
  const { fiscalYear, setFiscalYear } = props;
  const [options, setOptions] = useState<OptionType[]>([]);

  const { data: fiscalYearData, isFetched } = useFiscalYearData({
    escape_pg: true
  });

  useEffect(() => {
    if (isFetched && fiscalYearData) {
      const options = generateLabelValueArray(fiscalYearData?.records);
      setOptions(options);

      fiscalYearData?.records.forEach((item) => {
        if (item.is_active) {
          setFiscalYear(item.id);
        }
      });
    }
  }, [fiscalYearData, isFetched]);
  return (
    <StyledYearSelector>
      <StyledSelect
        calculateValueOnChange
        options={options || []}
        value={fiscalYear ?? ''}
        onChange={({ main }) => {
          setFiscalYear(main ?? '');
        }}
        placeholder="Choose Fiscal Year"
      />
    </StyledYearSelector>
  );
};

export default CommonFiscalSelector;
