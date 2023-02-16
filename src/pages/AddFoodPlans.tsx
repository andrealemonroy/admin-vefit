import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Theme } from '../components/atoms/theme';
import { TitleL } from '../components/atoms/Typography';
import { Breadcrumb } from '../components/molecules/Breadcrumb';
import Form from '../components/organisms/Form';
import { ToastVariants } from '../constants/variants';
import { show } from '../redux/reducers/toast';
import {
  useCreateAlimentMutation,
  useGetAlimentsQuery,
  useUpdateAlimentMutation,
} from '../redux/reduxQuery/alimentsApi';
import {
  useCreateFoodPlanMutation,
  useGetFoodPlansQuery,
} from '../redux/reduxQuery/foodPlansApi';
import { useGetUsersQuery } from '../redux/reduxQuery/usersApi';

export const AddFoodPlans = () => {
  const urlParams = window.location.pathname.split('/');
  const form = useForm();
  const [createFoodPlan] = useCreateFoodPlanMutation();
  const [updateFoodPlan] = useUpdateAlimentMutation();
  const { data: users } = useGetUsersQuery('');
  const { data: foodPlans } = useGetFoodPlansQuery('');
  const navigate = useNavigate();

  const formInputs = [
    [
      {
        id: 'patient',
        label: 'Paciente',
        type: 'text',
        select: true,
        options: users?.map((user: any) => ({
          value: user.email,
          label: user.name,
        })),
        placeholder: 'Email del paciente',
        required: true,
      },
      {
        id: 'name',
        label: 'Nombre del plato',
        type: 'text',
        placeholder: 'Nombre del plato',
        required: true,
      },
      {
        id: 'ingredients',
        label: 'Ingredientes',
        type: 'text',
        placeholder: 'Ingredientes del plato',
        required: true,
      },
      {
        id: 'preparation',
        label: 'Preparación',
        type: 'text',
        placeholder: 'Preparación del plato',
        required: true,
      },
    ],
    [
      {
        id: 'schedule',
        label: 'Horario',
        type: 'text',
        select: true,
        options: [
          {
            value: '06:00',
            label: '06:00',
          },
          {
            value: '09:00',
            label: '09:00',
          },
          {
            value: '12:00',
            label: '12:00',
          },
          {
            value: '15:00',
            label: '15:00',
          },
          {
            value: '18:00',
            label: '18:00',
          },
          {
            value: '21:00',
            label: '21:00',
          },
        ],
        placeholder: 'Horario del plato',
        required: true,
      },
      {
        id: 'date',
        label: 'Fecha del plato',
        type: 'text',
        inputDate: true,
        placeholder: 'Fecha del plato',
        required: true,
      },
    ],
  ];

  const crumbs = [
    {
      text: 'Plan de comidas',
      path: '/planes-de-comidas',
    },
    {
      text: `${urlParams[2] ? 'Editar' : 'Agregar'} plan de comidas`,
      path: '/agregar-plan-de-comida',
    },
  ];

  const addFoodPlan = form.handleSubmit(async (data) => {
    createFoodPlan(data).then((res: any) => {
      if (res.error) {
        show({
          message: 'Error al agregar alimento',
          variant: ToastVariants.DANGER,
        });
      } else {
        show({
          message: 'Alimento agregado correctamente',
          variant: ToastVariants.SUCCESS,
        });
        form.reset();
      }
    });
  });

  const editFoodPlan = form.handleSubmit(async (data) => {
    updateFoodPlan({ id: urlParams[2], ...data }).then((res: any) => {
      if (res.error) {
        show({
          message: 'Error al editar alimento',
          variant: ToastVariants.DANGER,
        });
      } else {
        show({
          message: 'Alimento editado correctamente',
          variant: ToastVariants.SUCCESS,
        });
        navigate('/alimentos');
      }
    });
  });

  useEffect(() => {
    if (urlParams[2] && foodPlans) {
    }
  }, [foodPlans]);

  return (
    <div>
      <div className="my-2">
        <Breadcrumb
          crumbs={crumbs}
          buttons={[
            <Button
              buttonText={`${urlParams[2] ? 'Editar' : 'Agregar'} alimento`}
              onClick={urlParams[2] ? editFoodPlan : addFoodPlan}
              color={Theme.colors.primaries_000}
              noText={true}
            />,
          ]}
        />
      </div>
      <Form
        {...form}
        formInputs={formInputs}
        numberOfColumns={2}
        customSubmit={true}
      />
    </div>
  );
};
