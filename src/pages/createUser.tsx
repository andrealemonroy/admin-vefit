import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/atoms/Button';
import { Theme } from '../components/atoms/theme';
import { TitleM } from '../components/atoms/Typography';
import { Breadcrumb } from '../components/molecules/Breadcrumb';
import Form from '../components/organisms/Form';
import { ToastVariants } from '../constants/variants';
import { show } from '../redux/reducers/toast';
import { useCreateUserMutation } from '../redux/reduxQuery/usersApi';

export const CreateUser = () => {
  const form = useForm();
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  const formInputs = [
    {
      id: 'name',
      label: 'Nombre',
      type: 'text',
      name: 'name',
      placeholder: 'Nombre',
      required: true,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      required: true,
    },
    {
      id: 'password',
      label: 'Contraseña',
      type: 'password',
      name: 'password',
      placeholder: 'Contraseña',
      required: true,
    },
  ];
  const crumbs = [
    {
      text: 'Inicio',
      path: '/',
    },
    {
      text: 'Crear usuario',
      path: '/crear-usuario',
    },
  ];

  const onSubmit = form.handleSubmit((data) => {
    try {
      createUser(data).then((res: any) => {
        if (res.error) {
          show({
            message: res.error.data,
            variant: ToastVariants.DANGER,
            withIcon: true,
          });
        } else {
          show({
            message: 'Usuario creado correctamente',
            variant: ToastVariants.SUCCESS,
            withIcon: true,
          });
          navigate(`/usuarios/${data.email}`, { replace: true });
        }
      });
    } catch (error) {
      console.log('ERROR', error);
      show({
        message: 'Error al crear usuario',
        variant: ToastVariants.DANGER,
        withIcon: true,
      });
    }
  });

  const buttons = [
    <Button
      buttonText="Crear usuario"
      onClick={onSubmit}
      color={Theme.colors.primaries_000}
      noText={true}
    />,
  ];

  return (
    <>
      <Breadcrumb crumbs={crumbs} buttons={buttons} />
      <div className="mt-4">
        <Form
          formInputs={formInputs}
          {...form}
          numberOfColumns={1}
          customSubmit={true}
        />
      </div>
    </>
  );
};
