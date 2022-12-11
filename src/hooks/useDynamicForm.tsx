import * as Yup from 'yup';

type dynamicInitialValueSchemaProps = {
  dataType: string;
  fieldName: string;
  id: number;
  label: string;
  validationDetail: {
    type: any;
    options: [any, string];
  }[];
  requisitionOptions: any[];
}[];

const sanitizeYupType = (type: string) => {
  switch (type) {
    case 'max-length':
      return 'max';
    case 'min-length':
      return 'min';
    default:
      return type;
  }
};

const optionValidation = (option: [any, string]): Array<any> => {
  if (typeof option[0] === 'boolean') {
    return [option[1]];
  } else {
    return option;
  }
};

export const createDynamicInitialValues = (formElements?: dynamicInitialValueSchemaProps) => {
  const initialValue: any = {};
  formElements?.forEach((element) => {
    initialValue[element.fieldName] = {
      label: element.label,
      value: ''
    };
    // if (element.requisitionOptions) {
    //   initialValue[element.fieldName]['requisitionOptions'] = element.requisitionOptions;
    // }
  });

  return initialValue;
};

export const dynamicValidationSchema = (formElements?: dynamicInitialValueSchemaProps) => {
  const initialValue: any = {};

  formElements?.forEach((formElement) => {
    let value = (Yup as any)[formElement.dataType === 'object' ? 'mixed' : formElement.dataType]();
    formElement.validationDetail.forEach((validation) => {
      if (validation.options[0] !== false) {
        if (validation.type === 'matches') {
          value = value[validation.type](
            ...[new RegExp(validation.options[0]), validation.options[1]]
          );
        } else {
          value = value[sanitizeYupType(validation.type)](...optionValidation(validation.options));
        }
      }
    });
    initialValue[formElement.fieldName] = Yup.object({
      label: Yup.string(),
      value
    });
  });

  const declaredData = (
    name: string,
    validationForInitialValue: {
      [key: string]: any | undefined;
    }
  ) => {
    return Yup.object().shape({
      ...validationForInitialValue,
      [name]: Yup.object({ ...initialValue })
    });
  };

  return { declaredData };
};

const useDynamicForm = (
  // args: any | undefined | [],
  formData: any,
  // id: number | undefined | null,
  name: string,
  dynamicFormValue?: any
) => {
  const { declaredData } = dynamicValidationSchema(dynamicFormValue?.specifications || []);

  const InitialValue = {
    ...formData,
    [name]: { ...createDynamicInitialValues(dynamicFormValue?.specifications || []) }
  };

  return { InitialValue, declaredData };
};

export default useDynamicForm;
