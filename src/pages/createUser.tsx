import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/atoms/Button';
import { Theme } from '../components/atoms/theme';
import { TitleM } from '../components/atoms/Typography';
import { Breadcrumb } from '../components/molecules/Breadcrumb';
import Form from '../components/organisms/Form';
import { ToastVariants } from '../constants/variants';
import { show } from '../redux/reducers/toast';
import {
  useCreateUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '../redux/reduxQuery/usersApi';

export const CreateUser = () => {
  const urlParams = window.location.pathname.split('/');
  const form = useForm();
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const { data: users } = useGetUsersQuery('');
  const [foundUser, setFoundUser] = React.useState<any>(null);

  const formInputs = [
    [
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
        id: 'birthday',
        label: 'Fecha de nacimiento',
        name: 'birthday',
        placeholder: 'Fecha de nacimiento',
        inputDate: true,
      },
      {
        id: 'password',
        label: 'Contraseña',
        type: 'password',
        name: 'password',
        placeholder: 'Contraseña',
        required: true,
      },
    ],
    [
      {
        id: 'typefood',
        label: 'Tipo de comida',
        type: 'text',
        name: 'typefood',
        placeholder: 'Tipo de comida',
        select: true,
        options: [],
      },
      {
        id: 'weight',
        label: 'Peso',
        type: 'number',
        name: 'weight',
        placeholder: 'Peso',
      },
      {
        id: 'height',
        label: 'Altura',
        type: 'number',
        name: 'height',
        placeholder: 'Altura',
      },
      {
        id: 'diseases',
        label: 'Enfermedades',
        type: 'addNew',
        name: 'diseases',
        placeholder: 'Enfermedades',
      },
      {
        id: 'termsAndConditions',
        label: 'Acepto los términos y condiciones',
        type: 'checkbox',
        name: 'termsAndConditions',
        placeholder: 'Acepto los términos y condiciones',
      },
      {
        id: 'privacyPolicy',
        label: 'Aceptó la política de privacidad',
        type: 'checkbox',
        name: 'privacyPolicy',
        placeholder: 'Aceptó la política de privacidad',
      },
    ],
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

  const onUpdate = form.handleSubmit((data) => {
    try {
      data._id = foundUser?._id;
      updateUser(data).then((res: any) => {
        if (res.error) {
          show({
            message: res.error.data,
            variant: ToastVariants.DANGER,
            withIcon: true,
          });
        } else {
          show({
            message: 'Usuario actualizado correctamente',
            variant: ToastVariants.SUCCESS,
            withIcon: true,
          });
          navigate(`/usuarios/${data._id}`, { replace: true });
        }
      });
    } catch (error) {
      console.log('ERROR', error);
      show({
        message: 'Error al actualizar usuario',
        variant: ToastVariants.DANGER,
        withIcon: true,
      });
    }
  });

  const buttons = [
    <Button
      buttonText={`${urlParams[2] ? 'Actualizar' : 'Crear'} usuario`}
      onClick={urlParams[2] ? onUpdate : onSubmit}
      color={Theme.colors.primaries_000}
      noText={true}
    />,
  ];

  useEffect(() => {
    if (urlParams[2] && users) {
      const findUser = users.find((user: any) => user._id === urlParams[2]);
      if (findUser) {
        setFoundUser(findUser);
        console.log('findUser', findUser);
        form.setValue('name', findUser.name);
        form.setValue('email', findUser.email);
        form.setValue('password', findUser.password);
      }
    }
  }, [users]);

  return (
    <>
      <Breadcrumb crumbs={crumbs} buttons={buttons} />
      <div className="mt-4">
        <Form
          formInputs={formInputs}
          {...form}
          numberOfColumns={2}
          customSubmit={true}
        />
      </div>
    </>
  );
};
