import Table from '@/components/Table/DataTable';
import { TableAction } from '@/components/Table/TableComponent';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import { useFiscalProvinceData } from './provinceQueries';
import ProvinceForm from './ProvinceSetupForm';
import { FiscalProvinceData, FiscalProvinceInitialValue } from './schema';
import Badge from '@/components/derived/Badge';

interface ProvinceTableProps {
  fiscalYear: number | string;
}

function ProvinceTable(props: ProvinceTableProps) {
  const { fiscalYear } = props;

  const { data: provinceData, isLoading: provinceLoading } = useFiscalProvinceData({
    fiscal_year: fiscalYear
  });

  const permissionGate = usePermissionGate(SCREEN_CODE.PROVINCE_SETUP);
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(FiscalProvinceInitialValue);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // const { mutate } = useDeleteProvince();

  // const [importFile, setImportFile] = useState<File>();
  // const { mutate: mutateImport, isLoading: importLoading } = useProvinceImport();

  // const handleImport = (file: File) => {
  //   mutateImport({ file });
  // };

  const columns = useMemo(() => {
    const column = [
      {
        Header: t('common:table.province_en'),
        accessor: 'name_en',
        Cell: ({ row }: Cell<FiscalProvinceData>) => {
          const { name_en } = row.original.province;
          return name_en || '';
        }
      },
      {
        Header: t('common:table.province_np'),
        accessor: 'name_np',
        Cell: ({ row }: Cell<FiscalProvinceData>) => {
          const { name_np } = row.original.province;
          return name_np || '';
        }
      },
      {
        Header: t('common:table.province_num'),
        accessor: 'id',
        Cell: ({ row }: Cell<FiscalProvinceData>) => {
          const { id } = row.original.province;
          return id || '';
        }
      },
      {
        Header: t('common:table.status'),
        Cell: ({ row }: Cell<FiscalProvinceData>) => {
          return (
            <>
              {row.original?.details ? (
                <Badge bgColor="success" text={'Complete'} />
              ) : (
                <Badge bgColor="danger" text={'Incomplete'} />
              )}
            </>
          );
        }
      },
      ...(permissionGate.can_update
        ? [
            {
              Header: t('common:table.action'),
              Cell: ({ row }: Cell<FiscalProvinceData>) => {
                const { id, name_en } = row.original.province;

                return (
                  <TableAction
                    handleEditClick={
                      permissionGate.can_update && row.original.details
                        ? () => {
                            toggle && toggle();
                            setFormData({
                              id: row.original.details?.id,
                              province: id,
                              name: name_en,
                              population: row.original?.details?.population ?? '',
                              area: row.original?.details?.area ?? '',
                              road: row.original?.details?.road ?? '',
                              sed_index: row.original?.details?.sed_index ?? '',
                              hdi: row.original?.details?.hdi ?? '',
                              it_access: row.original?.details?.it_access ?? '',
                              drinking_water_index:
                                row.original?.details?.drinking_water_index ?? '',
                              expense_need: row.original?.details?.expense_need ?? '',
                              household_with_electricity:
                                row.original?.details?.household_with_electricity ?? '',
                              revenue_capacity: row.original?.details?.revenue_capacity ?? '',
                              toilet_availability_index:
                                row?.original?.details?.toilet_availability_index ?? '',
                              total_house_hold: row?.original?.details?.total_house_hold ?? ''
                            });
                          }
                        : undefined
                    }
                    handleConfigurationClick={
                      permissionGate.can_update && row.original.details === null
                        ? () => {
                            toggle && toggle();
                            setFormData({
                              ...formData,
                              province: id,
                              name: name_en
                            });
                          }
                        : undefined
                    }
                  />
                );
              }
            }
          ]
        : [])
    ];

    return column;
  }, [permissionGate.can_update, permissionGate.can_delete, t, fiscalYear]);

  return (
    <>
      <Table
        data={provinceData || []}
        columns={columns}
        isSearch
        loading={provinceLoading}
        // isImportExport
        // importExportLoading={importLoading}
        // importExportProps={{
        //   handleImportCSV: setImportFile
        // }}
      />
      <ProvinceForm toggle={toggle} isOpen={isOpen} formData={formData} />
    </>
  );
}

export default ProvinceTable;
