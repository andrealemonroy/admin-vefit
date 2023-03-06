import { EyeIcon, TrashIcon } from '@heroicons/react/outline';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TitleL, TitleM } from '../components/atoms/Typography';
import { Table } from '../components/organisms/Table';
import { useCreateUserMutation, useGetUsersQuery, useDeleteUserMutation } from '../redux/reduxQuery/usersApi';

const Dashboard = () => {
  const { data: users, isFetching,
    refetch, } = useGetUsersQuery('');
  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const columns = [
    {
      Header: 'Nombre',
      accessor: 'name',
    },
    {
      Header: 'Correo',
      accessor: 'email',
    },
    {
      Header: 'Fecha nac',
      accessor: 'datebirth',
      Cell: ({ value }) => {
        return <div className='text-center w-full'>{new Date(value).toLocaleDateString()}</div>;
      },
    },
    {
      Header: 'Enfermedades',
      accessor: 'diseases',
    },
    {
      Header: 'Altura',
      accessor: 'height',
      Cell: ({ value }) => {
        return `${value} cm`;
      },
    },
    {
      Header: 'Peso',
      accessor: 'weight',
      Cell: ({ value }) => {
        return `${value} kg`;
      },
    },
    {
      Header: 'Tipo de comida',
      accessor: 'typefood',
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
                  console.log(row.original._id);
                  navigate(`/usuarios/${row.original._id}`);
                }}
              >
                <EyeIcon className="h-5 w-5" />
              </button>
            </div>
            <div>
              <button
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  deleteUser(row.original._id);
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

  useEffect(() => {
    refetch();
  }, []);


  return (
    <div>
      <div className="my-3">
        <TitleM>Usuarios</TitleM>
      </div>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <Table columns={columns} data={users} tableType={'users'} onClick={() => navigate('/crear-usuario')} />
      )}
    </div>
  );
};

export default Dashboard;
