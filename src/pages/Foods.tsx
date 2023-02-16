import { EyeIcon, TrashIcon } from '@heroicons/react/outline';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TitleL, TitleM } from '../components/atoms/Typography';
import { Breadcrumb } from '../components/molecules/Breadcrumb';
import { Table } from '../components/organisms/Table';
import {
  useDeleteAlimentMutation,
  useGetAlimentsQuery,
} from '../redux/reduxQuery/alimentsApi';

export const Foods = () => {
  const navigate = useNavigate();
  const { data: aliments, isFetching } = useGetAlimentsQuery('');
  const [deleteAliment] = useDeleteAlimentMutation();
  const columns = [
    {
      Header: 'Nombre',
      accessor: 'name',
      Cell: ({ row }) => {
        console.log(row);
        return (
          <div className="text-center w-full flex flex-col gap-2">
            <div>{row.original.name}</div>
            <div>
              <span>Fuente: </span>
              {row.original.source}
            </div>
          </div>
        );
      },
    },
    {
      Header: 'Descripción',
      accessor: 'description',
    },
    {
      Header: 'Características',
      accessor: 'characteristics',
    },
    {
      Header: 'Beneficios',
      accessor: 'benefits',
    },
    {
      Header: 'Recomendaciones',
      accessor: 'recommendations',
    },
    {
      Header: 'Puede ser reemplazado por',
      accessor: 'canBeReplacedBy',
      Cell: ({ row }) => {
        console.log(row);
        return (
          <div className="text-center w-full flex flex-col gap-2">
            {row.original.canBeReplacedBy.map((item) => (
              <div>{item.label}</div>
            ))}
          </div>
        );
      },
    },
    {
      Header: 'Acciones',
      accessor: 'actions',
      Cell: ({ row }) => {
        return (
          <div className="text-center w-full flex gap-2">
            <div>
              <button
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  navigate(`/agregar-alimento/${row.original._id}`);
                }}
              >
                <EyeIcon className="h-5 w-5" />
              </button>
            </div>
            <div>
              <button
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  deleteAliment(row.original._id);
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
  const deleteFood = (food: any) => {
    console.log(food, 'food');
    deleteAliment(food._id).then((res) => {
      console.log(res);
    });
  };
  const editFood = (food: any) => {
    navigate(`/agregar-alimento/${food._id}`);
  };
  return (
    <div>
      <div className="my-3">
        <TitleM>Alimentos</TitleM>
      </div>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <Table
          columns={columns}
          data={aliments}
          tableType={'aliments'}
          onClick={() => {
            navigate(`/agregar-alimento`);
          }}
        />
      )}
    </div>
  );
};
