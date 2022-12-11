import { Box } from '@/components/core';
import { Label } from '@/components/core/FormElement/index';

import StyledSelect, { OptionType } from '@/components/StyledSelect/StyledSelect';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';

import { ModalHeader, Modal, ModalBody, ModalFooter } from '@/components/utils';
import {
  UserScreenFormData,
  userScreenInitialValues,
  ScreenListResponseData,
  UserScreenRequestData,
  userScreenValidationSchema
} from './schema';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useUserScreenCreator } from './userScreenQueries';
import Button from '@/components/derived/Buttons/Buttons';
import { useScreenListForConfig } from '@/core/Protected/RoleManagement/RoleAccessMapping/RoleScreen/roleScreenQueries';
import { PRIVILEGE_SCREEN_TYPE } from '@/shared/enums';

export interface UserScreenFromProps {
  toggle: () => void;
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number | undefined;
}

function UserScreenForm(props: UserScreenFromProps) {
  const { toggle, isOpen, setIsOpen, userId } = props;

  const [screenListOption, setScreenListOption] = useState<OptionType[]>([]);

  const {
    data: screenData,
    isLoading: screenDataLoading,
    isSuccess: screenDataFetched
  } = useScreenListForConfig({ id: Number(userId), screen: PRIVILEGE_SCREEN_TYPE.USERS });

  const { mutate: userScreenCreator } = useUserScreenCreator();

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
    initialValues: userScreenInitialValues,
    validationSchema: userScreenValidationSchema,
    onSubmit: (values: UserScreenFormData, { resetForm }) => {
      const requestData: UserScreenRequestData = {
        menus: values.menus.map((v) => {
          if (v.value !== '*') {
            return v.value;
          }
        }),
        type: PRIVILEGE_SCREEN_TYPE.USERS,
        id: userId
      };
      userScreenCreator(requestData);
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

export default UserScreenForm;
