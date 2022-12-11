import { Box, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement/index';
import Button from '@/components/derived/Buttons/Buttons';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import StyledSelect, { OptionType } from '@/components/StyledSelect/StyledSelect';
import { userManagementPath } from '@/routes/protected/userManagement';
import { generateFileUrl } from '@/utils';
import { mobileInputRegex } from '@/utils/regex';
import { generateRoleLabelValueArray, getLanguageLabelValueArray } from '@/utils/selectHelper';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useDepartmentData } from '../../MasterData/Department/departmentQueries';
import { useDesignationData } from '../../MasterData/Designation/designationQueries';
import { useRoleData } from '../../RoleManagement/Roles/roleQueries';
import {
  useGetInternalUserById,
  useInternalUserCreator,
  useInternalUserProvinceBranchList
} from './internalUserQueries';

import {
  InternalUserData,
  internalUserInitialValue,
  internalUserValidationSchema,
  InternalUserValueProps
} from './internalUserSchema';

function InternalUserForm() {
  const [formData, setFormData] = useState<any>(internalUserInitialValue);
  const { t } = useTranslation();
  const [file, setFile] = useState<any>();

  const [paramId, setParamId] = useState<number>();
  const [provincesOption, setProvincesOption] = useState<OptionType[]>([]);
  const [branchOption, setBranchOption] = useState<OptionType[]>();
  const [designationOption, setDesignationOption] = useState<OptionType[]>();
  const [departmentOption, setDepartmentOption] = useState<OptionType[]>();
  const [roleOption, setRoleOption] = useState<OptionType[]>();
  const [shouldAddNew, setShouldAddNew] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: provinceData,
    isLoading: provinceLoading,
    isSuccess: provinceFetched
  } = useInternalUserProvinceBranchList({ data: 'province' });

  const {
    data: departmentData,
    isLoading: departmentDataLoading,
    isSuccess: departmentDataFetched
  } = useDepartmentData({ escape_pg: true });

  const { mutate: internalUserMutate } = useInternalUserCreator(shouldAddNew);

  const { data: getUserByIdData } = useGetInternalUserById(paramId);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    setFieldValue,
    setFieldTouched
    // resetForm
  } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: internalUserValidationSchema,
    onSubmit: (values: InternalUserValueProps, { resetForm }) => {
      if (values) {
        const requestData: InternalUserData = {
          ...values,

          employee_id: values?.employee_id?.toString(),
          province: values.province?.value ?? '',
          branch: values.branch?.value ?? '',
          designation: values.designation?.value ?? '',
          department: values.department?.value ?? '',
          role: values.role?.value ?? '',
          picture: file && file
        };

        if (typeof file === 'string' || file === undefined) {
          delete requestData.picture;
        }

        internalUserMutate(requestData, {
          onSuccess: () => {
            if (!shouldAddNew) {
              navigate(userManagementPath.internalUser);
            }
            resetForm();
          }
        });
      }
    }
  });

  const {
    data: branchData,
    isLoading: branchLoading,
    isSuccess: branchFetched
  } = useInternalUserProvinceBranchList({
    data: 'branch',
    province_id: values.province?.value
  });

  const {
    data: designationData,
    isLoading: designationLoading,
    isSuccess: designationFetched
  } = useDesignationData({ escape_pg: true });

  const { data: roleData, isSuccess: roleDataFetched, isLoading: roleLoading } = useRoleData({});

  useEffect(() => {
    if (provinceFetched && provinceData) {
      const provinces = getLanguageLabelValueArray(provinceData);
      setProvincesOption(provinces);
    }
  }, [provinceData, provinceFetched, t]);

  useEffect(() => {
    if (branchData && branchFetched) {
      const branchCategories = getLanguageLabelValueArray(branchData);
      setBranchOption(branchCategories);
    }
  }, [branchData, branchFetched, t]);

  useEffect(() => {
    if (id) {
      setParamId(Number(id));
      setFile(getUserByIdData?.data?.picture);

      // if (editData) {
      setFormData({
        ...getUserByIdData?.data,
        designation: {
          label: getUserByIdData?.data?.designation.name_en,
          value: getUserByIdData?.data?.designation.id
        },
        branch: {
          label: getUserByIdData?.data?.branch.name_en,
          value: getUserByIdData?.data?.branch.id
        },
        department: {
          label: getUserByIdData?.data?.department.name_en,
          value: getUserByIdData?.data?.department.id
        },
        role: {
          label: getUserByIdData?.data?.role.name,
          value: getUserByIdData?.data?.role.id
        },
        province: {
          label: getUserByIdData?.data?.province.name_en,
          value: getUserByIdData?.data?.province.id
        }
      });
      // }
    }
  }, [id, getUserByIdData, t]);

  useEffect(() => {
    if (designationData && designationFetched) {
      const designationCategories = getLanguageLabelValueArray(designationData.records);
      setDesignationOption(designationCategories);
    }
  }, [designationData, designationFetched, t]);

  useEffect(() => {
    if (departmentDataFetched && departmentData) {
      const department = getLanguageLabelValueArray(departmentData.records);
      setDepartmentOption(department);
    }
  }, [departmentData, departmentDataFetched, t]);

  useEffect(() => {
    if (roleDataFetched && roleData) {
      const role = generateRoleLabelValueArray(roleData.records);
      setRoleOption(role);
    }
  }, [roleData, roleDataFetched]);

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>, createAndAdd?: boolean) => {
    e.preventDefault();
    handleSubmit();
    if (createAndAdd) {
      setShouldAddNew(true);
    }
  };

  const formType = id ? 'Edit' : 'Create';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }

    if (typeof values.picture !== 'string') {
      setFieldValue('picture', {
        image: (e.target.files && URL.createObjectURL(e.target.files[0])) || '',
        name: e.target.files?.[0].name || '',
        original: e.target.files?.[0]
      });
    }
  };

  return (
    <>
      <Layout.Header backToList={true}>
        <HeaderTitle>{t('common:header.internal_user')}</HeaderTitle>
      </Layout.Header>
      <Box className="flex-grow-1 position-relative">
        <Layout.Absolute scrollable>
          <Layout.Container stretch centered className="py-4">
            <form
              className="h-100"
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                handleSubmit();
              }}>
              <Box className="row">
                <Box className="col-lg-3">
                  <Box className="file-upload">
                    {!file ? (
                      <>
                        <label className="text-center" htmlFor="file">
                          <i className="ic-image text-cool-gray-500 h3" />
                          <Text variant="display2">
                            <span className="d-block my-3">
                              {' '}
                              {t('common:buttons.upload')} {t('common:buttons.file')}
                            </span>
                            <Button
                              type="button"
                              className="btn btn-sm btn-primary"
                              role="button"
                              onClick={() => fileRef?.current?.click()}>
                              {t('common:buttons.browse')}
                            </Button>
                          </Text>
                        </label>
                        <input
                          name="picture"
                          id="file"
                          hidden
                          type="file"
                          ref={fileRef}
                          onChange={handleFileUpload}
                          onBlur={handleBlur}
                          accept={'image/*'}
                          onDrag={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        />
                      </>
                    ) : (
                      <div className="text-center w-100">
                        <i
                          className="ic-close close h4"
                          role="button"
                          onClick={() => setFile(null)}></i>
                        <div className="file-image__square">
                          <img
                            src={
                              typeof file === 'string'
                                ? generateFileUrl(values.picture)
                                : URL.createObjectURL(file)
                            }
                            alt=""
                            className="file-image__square"
                          />
                        </div>
                        <p className="text-truncate mt-3">
                          {typeof file === 'string' ? file : file.name}
                        </p>
                      </div>
                    )}
                  </Box>
                  <FormikValidationError name="picture" errors={errors} touched={touched} />
                </Box>
                <Box className="col-lg-9">
                  <Box className="row">
                    <Box className="col-lg-4">
                      <Box className="mb-3">
                        <Label htmlFor="first_name">{t('user:firstName')}</Label>
                        <Input
                          value={values?.first_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="first_name"
                        />
                        <FormikValidationError
                          name="first_name"
                          errors={errors}
                          touched={touched}
                        />
                      </Box>
                    </Box>
                    <Box className="col-lg-4">
                      <Box className="mb-3">
                        <Label htmlFor="middle_name">{t('user:middleName')}</Label>
                        <Input
                          value={values?.middle_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="middle_name"
                        />
                        <FormikValidationError
                          name="middle_name"
                          errors={errors}
                          touched={touched}
                        />
                      </Box>
                    </Box>
                    <Box className="col-lg-4">
                      <Box className="mb-3">
                        <Label htmlFor="name_np">{t('user:lastName')}</Label>
                        <Input
                          value={values?.last_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="last_name"
                        />
                        <FormikValidationError name="last_name" errors={errors} touched={touched} />
                      </Box>
                    </Box>
                    <Box className="col-lg-4">
                      <Box className="mb-3">
                        <Label htmlFor="email">{t('user:email')}</Label>
                        <Input
                          value={values?.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="email"
                          // disabled={id ? true : false}
                        />
                        <FormikValidationError name="email" errors={errors} touched={touched} />
                      </Box>
                    </Box>
                    <Box className="col-lg-4">
                      <Box className="mb-3">
                        <Label htmlFor="mobile_number">{t('user:mobileNumber')}</Label>
                        <Input
                          value={values?.mobile_number}
                          onChange={(e) => {
                            if (e.target.value.match(mobileInputRegex) || e.target.value === '') {
                              setFieldValue('mobile_number', e.target.value);
                            }
                          }}
                          onBlur={handleBlur}
                          name="mobile_number"
                          // disabled={id ? true : false}
                        />
                        <FormikValidationError
                          name="mobile_number"
                          errors={errors}
                          touched={touched}
                        />
                      </Box>
                    </Box>

                    <Box className="col-lg-4">
                      <Box className="mb-3">
                        <Label htmlFor="">{t('user:designation')}</Label>
                        <StyledSelect
                          options={designationOption || []}
                          name="designation"
                          value={values?.designation}
                          onChange={(e) => {
                            console.log(e.value);
                            setFieldValue('designation', e.value);
                          }}
                          onBlur={() => setFieldTouched('designation', true)}
                          isLoading={designationLoading}
                        />
                        <FormikValidationError
                          name="designation"
                          errors={errors}
                          touched={touched}
                        />
                      </Box>
                    </Box>

                    <Box className="col-lg-4">
                      <Box className="mb-3">
                        <Label htmlFor="">{t('user:employeeId')}</Label>
                        <Input
                          value={values?.employee_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="employee_id"
                          // disabled={id ? true : false}
                        />
                        <FormikValidationError
                          name="employee_id"
                          errors={errors}
                          touched={touched}
                        />
                      </Box>
                    </Box>

                    <Box className="col-lg-4">
                      <Box className="mb-3">
                        <Label htmlFor="">{t('user:department')}</Label>
                        <StyledSelect
                          options={departmentOption || []}
                          name="department"
                          value={values?.department}
                          onChange={(e) => {
                            setFieldValue('department', e.value);
                          }}
                          onBlur={handleBlur}
                          isLoading={departmentDataLoading}
                        />
                        <FormikValidationError
                          name="department"
                          errors={errors}
                          touched={touched}
                        />
                      </Box>
                    </Box>
                    <Box className="col-lg-4">
                      <Box className="mb-3">
                        <Label htmlFor="">{t('user:province')}</Label>
                        <StyledSelect
                          options={provincesOption || []}
                          name="province"
                          value={values?.province}
                          onChange={(e) => {
                            setFieldValue('province', e.value);
                            setFieldValue('branch', null);
                          }}
                          onBlur={() => setFieldTouched('province', true)}
                          isLoading={provinceLoading}
                        />
                        <FormikValidationError name="province" errors={errors} touched={touched} />
                      </Box>
                    </Box>
                    <Box className="col-lg-4">
                      <Box className="mb-3">
                        <Label htmlFor="">{t('user:branch')}</Label>
                        <StyledSelect
                          options={branchOption || []}
                          name="branch"
                          value={values?.branch ? values.branch : null}
                          onChange={(e) => {
                            console.log('main', e);
                            setFieldValue('branch', e.value || null);
                          }}
                          onBlur={() => setFieldTouched('branch', true)}
                          isLoading={branchLoading}
                        />
                        <FormikValidationError name="branch" errors={errors} touched={touched} />
                      </Box>
                    </Box>
                    <Box className="col-lg-4">
                      <Box className="mb-3">
                        <Label htmlFor="">{t('common:profile.role')}</Label>
                        <StyledSelect
                          options={roleOption || []}
                          name="role"
                          value={values?.role ? values.role : null}
                          onChange={(e) => {
                            setFieldValue('role', e.value || null);
                          }}
                          onBlur={() => setFieldTouched('role', true)}
                          isLoading={roleLoading}
                        />
                        <FormikValidationError name="role" errors={errors} touched={touched} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </form>
          </Layout.Container>
        </Layout.Absolute>
      </Box>
      <Box className="text-end w-100 divider px-4 py-3">
        {formType === 'Create' && !id && (
          <Button
            className="btn btn-outline-gray-16 mr-3"
            type="submit"
            onClick={(e) => handleFormSubmit(e, true)}>
            {t('common:buttons.create_add')}
          </Button>
        )}
        <Button className="btn btn-success" type="submit" onClick={(e) => handleFormSubmit(e)}>
          {formType === 'Create' ? t('common:buttons.create') : t('common:buttons.edit')}
        </Button>
      </Box>
    </>
  );
}

export default InternalUserForm;
