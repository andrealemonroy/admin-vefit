import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/atoms/Button';
import { useParams } from 'react-router-dom';
import { Theme } from '../components/atoms/theme';
import { TitleM } from '../components/atoms/Typography';
import { Breadcrumb } from '../components/molecules/Breadcrumb';
import Form from '../components/organisms/Form';
import { ToastVariants } from '../constants/variants';
import { show } from '../redux/reducers/toast';
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} from '../redux/reduxQuery/usersApi';

export const UpdateUser = () => {
  const { _id } = useParams();
  const form = useForm();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const { data: users, isFetching } = useGetUsersQuery('');
  const navigate = useNavigate();
  const crumbs = [
    {
      text: 'Inicio',
      path: '/',
    },
    {
      text: 'Actualizar usuario',
      path: `usuarios/${_id}`,
    },
  ];
  const updateUserFormInputs = [
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
      type: 'date',
      name: 'birthday',
      placeholder: 'Fecha de nacimiento',
      required: true,
    },
    {
      id: 'kindOfFood',
      label: 'Tipo de comida',
      type: 'text',
      name: 'kindOfFood',
      placeholder: 'Tipo de comida',
      required: true,
    },
    {
      id: 'weight',
      label: 'Peso',
      type: 'number',
      name: 'weight',
      placeholder: 'Peso',
      required: true,
    },
    {
      id: 'height',
      label: 'Altura',
      type: 'number',
      name: 'height',
      placeholder: 'Altura',
      required: true,
    },
    {
      id: 'diseases',
      label: 'Enfermedades',
      type: 'addNew',
      name: 'diseases',
      placeholder: 'Enfermedades',
      required: true,
    },
    {
      id: 'termsAndConditions',
      label: 'Acepto los términos y condiciones',
      type: 'checkbox',
      name: 'termsAndConditions',
      placeholder: 'Acepto los términos y condiciones',
      required: true,
    },
    {
      id: 'privacyPolicy',
      label: 'Acepto la política de privacidad',
      type: 'checkbox',
      name: 'privacyPolicy',
      placeholder: 'Acepto la política de privacidad',
      required: true,
    },
  ];

  useEffect(() => {
    form.setValue('email', users.email);
    form.setValue('birthday', users.birthday);
    form.setValue('kindOfFood', users.kindOfFood);
    form.setValue('weight', users.weight);
    form.setValue('height', users.height);
    form.setValue('diseases', users.diseases);
    form.setValue('termsAndConditions', users.termsAndConditions);
    form.setValue('privacyPolicy', users.privacyPolicy);
  }, [users]);

  return (
    <div>
      <Breadcrumb
        crumbs={crumbs}
        buttons={[
          <Button
            buttonText="Actualizar usuario"
            color={Theme.colors.primaries_000}
            noText={true}
          />,
        ]}
      />
      <div className="mt-4">
        <Form
          {...form}
          formInputs={updateUserFormInputs}
          numberOfColumns={1}
          customSubmit={true}
        />
      </div>
    </div>
  );
};
