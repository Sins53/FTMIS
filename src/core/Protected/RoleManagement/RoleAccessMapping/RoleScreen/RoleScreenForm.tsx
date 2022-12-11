import { Box } from '@/components/core';
import { Label } from '@/components/core/FormElement/index';

import StyledSelect, { OptionType } from '@/components/StyledSelect/StyledSelect';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';

import { ModalHeader, Modal, ModalBody, ModalFooter } from '@/components/utils';
import {
  RoleScreenRequestData,
  ScreenFormData,
  screenInitialValues,
  ScreenListResponseData,
  screenValidationSchema
} from './schema';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useRoleScreenCreator, useScreenListForConfig } from './roleScreenQueries';
import Button from '@/components/derived/Buttons/Buttons';
import { PRIVILEGE_SCREEN_TYPE } from '@/shared/enums';

export interface RoleScreenFromProps {
  toggle: () => void;
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  roleId: number | undefined;
}

function RoleScreenForm(props: RoleScreenFromProps) {
  const { toggle, isOpen, setIsOpen, roleId } = props;

  const [screenListOption, setScreenListOption] = useState<OptionType[]>([]);

  const {
    data: screenData,
    isLoading: screenDataLoading,
    isSuccess: screenDataFetched
  } = useScreenListForConfig({ id: Number(roleId), screen: PRIVILEGE_SCREEN_TYPE.ROLES });

  const { mutate: roleScreenMutate } = useRoleScreenCreator();

  useEffect(() => {
    if (screenDataFetched && screenData) {
      const screen: OptionType[] =
        screenData?.data?.map((data: ScreenListResponseData) => {
          return {
            label: data.name,
            value: data.id
          };
        }) || [];
      setScreenListOption(screen);
    }
  }, [screenData, screenDataFetched]);

  const [shouldAddNew, setShouldAddNew] = useState(false);

  const {
    values,
    errors,
    // handleChange,
    handleSubmit,
    touched,
    handleBlur,
    setFieldValue,
    resetForm
  } = useFormik({
    enableReinitialize: true,
    initialValues: screenInitialValues,
    validationSchema: screenValidationSchema,
    onSubmit: (values: ScreenFormData, { resetForm }) => {
      const requestData: RoleScreenRequestData = {
        menus: values.menus.map((v) => {
          if (v.value !== '*') {
            return v.value;
          }
        }),
        type: PRIVILEGE_SCREEN_TYPE.ROLES,
        id: roleId
      };
      roleScreenMutate(requestData);
      if (!shouldAddNew && toggle) {
        toggle();
      } else {
        setIsOpen(true);
      }
      resetForm();
    }
  });

  return (
    <>
      <Modal
        toggle={() => {
          toggle();
          resetForm();
        }}
        centered
        isOpen={isOpen}>
        <ModalHeader
          toggle={() => {
            toggle();
            resetForm();
          }}>
          <p>Add Screen</p>
        </ModalHeader>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <ModalBody>
            <Box className="mb-2">
              <Label htmlFor="">Screen</Label>
              <StyledSelect
                options={screenListOption || []}
                name="menus"
                multiCheckbox
                value={values.menus}
                onChange={({ value }) => {
                  setFieldValue('menus', value);
                }}
                calculateValueOnChange
                onBlur={handleBlur}
                isLoading={screenDataLoading}
              />
              <FormikValidationError name="menus" errors={errors} touched={touched} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-outline-gray-16"
              type="submit"
              onClick={() => setShouldAddNew(true)}>
              Create and add new
            </Button>
            <Button
              className="btn btn-success"
              type="submit"
              onClick={() => setShouldAddNew(false)}>
              Create
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default RoleScreenForm;
