import { useNavigate } from 'react-router-dom';
import { TitleL, TitleM } from '../components/atoms/Typography';
import { Table } from '../components/organisms/Table';
import { useGetUsersQuery } from '../redux/reduxQuery/usersApi';

const Dashboard = () => {
  const { data: users, isFetching, refetch } = useGetUsersQuery('');
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
  ];
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
