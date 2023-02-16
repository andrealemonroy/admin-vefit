import { EyeIcon, TrashIcon } from '@heroicons/react/outline';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TitleM } from '../components/atoms/Typography';
import { Table } from '../components/organisms/Table';
import { show } from '../redux/reducers/toast';
import {
  useDeleteMedicalReportMutation,
  useGetMedicalReportsQuery,
} from '../redux/reduxQuery/medicalReportsApi';

export const MedicalReport = () => {
  const navigate = useNavigate();
  const [deleteMedicalReports] = useDeleteMedicalReportMutation();
  const {
    data: medicalReports,
    isFetching,
    refetch,
  } = useGetMedicalReportsQuery('');
  const columns = [
    {
      Header: 'Paciente',
      Cell: ({ row }) => {
        return (
          <div className="text-center w-full flex flex-col gap-2">
            <div>
              <span>Correo: </span>
              {row.original.patient}
            </div>
          </div>
        );
      },
    },
    {
      Header: 'Periodo',
      Cell: ({ row }) => {
        return (
          <div className="text-center w-full flex flex-col gap-2">
            <div>
              {row.original.initialDate} -{' '}
              {row.original.endDate}
            </div>
          </div>
        );
      },
    },
    {
      Header: 'Nutricionista',
      Cell: ({ row }) => {
        return (
          <div className="text-center w-full flex flex-col gap-2">
            <div>
              <span>Correo: </span>
              {row.original.nutritionist}
            </div>
          </div>
        );
      },
    },
    {
      Header: 'Acciones',
      Cell: ({ row }) => {
        return (
          <div className="text-center w-full flex gap-2">
            <div>
              <button
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  navigate(`/agregar-informe-medico/${row.original._id}`);
                }}
              >
                <EyeIcon className="h-5 w-5" />
              </button>
            </div>
            <div>
              <button
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  deleteMedicalReport(row.original._id);
                }}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  const deleteMedicalReport = async (id: string) => {
    deleteMedicalReports(id).then((res: any) => {
      if (res.error) show({ message: res.error, type: 'error' })
      else show({ message: 'Informe médico eliminado', type: 'success' })
    });
    refetch();
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <div className="my-3">
        <TitleM>Informes médicos</TitleM>
      </div>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <Table
          columns={columns}
          data={medicalReports}
          tableType={'medicalReports'}
          onClick={() => {
            navigate(`/agregar-informe-medico`);
          }}
        />
      )}
    </div>
  );
};
