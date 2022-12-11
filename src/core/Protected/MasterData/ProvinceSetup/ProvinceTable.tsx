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
          return row.original?.details ? 'Completed' : 'Not-Completed';
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
                              fiscal_year: row.original.details?.fiscal_year.id ?? '',
                              population: row.original?.details?.population ?? '',
                              area: row.original?.details?.area ?? '',
                              road: row.original?.details?.road ?? '',
                              mdi: row.original?.details?.mdi ?? '',
                              hdi: row.original?.details?.hdi ?? '',
                              it_access: row.original?.details?.it_access ?? ''
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
                              name: name_en,
                              fiscal_year: fiscalYear
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
