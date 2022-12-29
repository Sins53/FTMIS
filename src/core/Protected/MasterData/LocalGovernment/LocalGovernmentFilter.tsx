import { Box, Text } from '@/components/core';
import { Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import StyledSelect, { OptionType } from '@/components/StyledSelect/StyledSelect';
import { generateLabelValueArray } from '@/utils/selectHelper';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useFiscalYearData } from '../FiscalYear/fiscalYearQueries';
import { useProvinceData } from '../Location/locationQueries';

interface LocalGovernmentFilterProps {
  filterData: {
    fiscal_year: null;
    province: null;
  };
  setFilterData: React.Dispatch<
    React.SetStateAction<{
      fiscal_year: null;
      province: null;
    }>
  >;
}

function LocalGovernmentFilter(props: LocalGovernmentFilterProps) {
  const { filterData, setFilterData } = props;

  const [provinceOptions, setProvinceOptions] = useState<OptionType[]>();

  const [options, setOptions] = useState<OptionType[]>([]);

  const { data: fiscalYearData, isFetched } = useFiscalYearData({
    escape_pg: true
  });

  const { data: provinceData } = useProvinceData({});

  useEffect(() => {
    if (provinceData) {
      const province = provinceData?.records?.map((provinceDatum) => ({
        label: provinceDatum.name_en,
        value: provinceDatum.province_number
      }));
      setProvinceOptions(province);
    }
  }, [provinceData]);

  useEffect(() => {
    if (isFetched && fiscalYearData) {
      const options = generateLabelValueArray(fiscalYearData?.records);
      setOptions(options);

      fiscalYearData?.records.forEach((item) => {
        if (item.is_active) {
          setFilterData({
            ...filterData,
            fiscal_year: { label: item.name, value: item.id } as any
          });
        }
      });
    }
  }, [fiscalYearData, isFetched]);

  const { values, setFieldValue, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: filterData,
    onSubmit: () => {
      setFilterData(values);
    }
  });

  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit();
      }}>
      <Text variant="h6" typeface="medium">
        Filter By
      </Text>
      <Box className="my-2">
        <Label>Fiscal Year</Label>
        <StyledSelect
          options={options || []}
          value={values.fiscal_year}
          onChange={(e: any) => setFieldValue(e.name, e.value)}
          placeholder="Choose Fiscal Year"
        />
      </Box>
      <Box className="mb-3">
        <Label>Province</Label>
        <StyledSelect
          name={'province'}
          options={provinceOptions || []}
          value={values.province}
          placeholder="Choose Province"
          onChange={(e: any) => {
            setFieldValue(e?.name, e?.value);
          }}
        />
      </Box>
      <Box className="text-end">
        <Button className="btn btn-primary" type="submit">
          Filter
        </Button>
      </Box>
    </form>
  );
}

export default LocalGovernmentFilter;
