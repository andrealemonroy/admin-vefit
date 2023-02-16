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

export const FoodPlans = () => {
  const navigate = useNavigate();
  const { data: aliments, isFetching } = useGetAlimentsQuery('');
  const [deleteAliment] = useDeleteAlimentMutation();
  const columns = [
    {
      Header: 'Paciente',
      accessor: 'name',
      Cell: ({ row }) => {
        console.log(row);
        return (
          <div className="text-center w-full flex flex-col gap-2">
            <div>{row.original.name}</div>
            <div>
              <span>Correo: </span>
              {row.original.email}
            </div>
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
                  navigate(`/agregar-plan-de-comida/${row.original._id}`);
                }}
              >
                <EyeIcon className="h-5 w-5" />
              </button>
            </div>
            <div>
              <button
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  deletePlan(row.original._id);
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
  const deletePlan = (food: any) => {
    console.log(food, 'food');
    deleteAliment(food._id).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <div className="my-3">
        <TitleM>Planes de comida</TitleM>
      </div>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <Table
          columns={columns}
          data={aliments}
          tableType={'aliments'}
          onClick={() => {
            navigate(`/agregar-plan-de-comida`);
          }}
        />
      )}
    </div>
  );
};
