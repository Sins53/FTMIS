import { OptionType } from '@/components/StyledSelect/StyledSelect';
import * as Yup from 'yup';

export interface Datum {
  marks: number | null;
  indicator: number | null;
  name: string;
}
export interface IndicatorProps {
  grant_type: string;
  grant_id: number | null;
  module: OptionType | null;
  data: Datum[];
}
export const IndicatorInitialValues: IndicatorProps = {
  grant_type: '',
  grant_id: null,
  module: null,
  data: []
};

export const IndicatorValidationSchema = Yup.object({
  data: Yup.array()
    .of(
      Yup.object().shape({
        marks: Yup.number()
          .required('Marks is required')
          .min(1, 'Marks should be greater than 0')
          .nullable()
      })
    )
    .test('sum', 'The sum of marks must be 100.', (values: any) => {
      const sum = values.reduce(
        (accumulator: number, currentValue: any) => accumulator + currentValue.marks,
        0
      );
      return sum == 100;
    })
});

export interface IndicatorMarksData {
  marks: number;
  indicator: {
    id: number;
    name: string;
  };
}
