import { Box, Text } from '@/components/core';
import React from 'react';
import { Label } from 'reactstrap';
import CommonFiscalSelector from '../CommonFiscalSelector/CommonFiscalSelector';

function FiscalYearFilterComponent({
  fiscalYear,
  setFiscalYear
}: {
  fiscalYear: string | number;
  setFiscalYear: React.Dispatch<React.SetStateAction<string | number>>;
}) {
  return (
    <>
      <Text variant="h6" typeface="medium" className="mb-3">
        Filter By
      </Text>
      <Box className="mb-3">
        <Label>Fiscal Year</Label>
        <CommonFiscalSelector fiscalYear={fiscalYear} setFiscalYear={setFiscalYear} />
      </Box>
    </>
  );
}

export default FiscalYearFilterComponent;
