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

export const AddFood = () => {
  const urlParams = window.location.pathname.split('/');
  const form = useForm();
  const [createAliment] = useCreateAlimentMutation();
  const [updateAliment] = useUpdateAlimentMutation();
  const { data: aliments, isFetching } = useGetAlimentsQuery('');
  const navigate = useNavigate();

  const formInputs = [
    [
      {
        id: 'name',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Nombre del alimento',
        required: true,
      },
      {
        id: 'description',
        label: 'Descripción',
        type: 'text',
        placeholder: 'Descripción del alimento',
        required: true,
      },
      {
        id: 'source',
        label: 'Fuente',
        type: 'text',
        placeholder: 'Fuente del alimento',
        required: true,
      },
      {
        id: 'characteristics',
        label: 'Características',
        type: 'text',
        placeholder: 'Características del alimento',
        required: true,
      },
      {
        id: 'benefits',
        label: 'Beneficios',
        type: 'text',
        placeholder: 'Beneficios del alimento',
        required: true,
      },
      {
        id: 'recommendations',
        label: 'Recomendaciones',
        type: 'text',
        placeholder: 'Recomendaciones del alimento',
        required: true,
      },
    ],
    [
      {
        id: 'price',
        label: 'Precio',
        type: 'number',
        placeholder: 'Precio del alimento',
        required: false,
      },
      {
        id: 'image',
        label: 'Imagen',
        type: 'file',
        placeholder: 'Imagen del alimento',
        required: false,
      },
      {
        id: 'category',
        label: 'Categoría',
        type: 'text',
        placeholder: 'Categoría del alimento',
        required: true,
      },
      {
        id: 'canBeReplacedBy',
        label: 'Puede ser reemplazado por',
        select: true,
        placeholder: 'Alimentos que pueden ser reemplazados por este alimento',
        required: true,
        options: aliments?.map((aliment) => ({
          value: aliment._id,
          label: aliment.name,
        })),
      },
    ],
  ];

  const crumbs = [
    {
      text: 'Alimentos',
      path: '/alimentos',
    },
    {
      text: `${urlParams[2] ? 'Editar' : 'Agregar'} alimento`,
      path: '/agregar-alimento',
    },
  ];

  const addFood = form.handleSubmit(async (data) => {
    createAliment(data).then((res: any) => {
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

  const editFood = form.handleSubmit(async (data) => {
    updateAliment({ id: urlParams[2], ...data }).then((res: any) => {
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
        navigate('/alimentos')
      }
    });
  });

  useEffect(() => {
    if (urlParams[2] && aliments) {
      const aliment = aliments?.find((aliment) => aliment._id === urlParams[2]);
      console.log(aliment, 'aliment');
      form.setValue('name', aliment.name);
      form.setValue('description', aliment.description);
      form.setValue('source', aliment.source);
      form.setValue('characteristics', aliment.characteristics);
      form.setValue('benefits', aliment.benefits);
      form.setValue('recommendations', aliment.recommendations);
      form.setValue('price', aliment.price);
      form.setValue('category', aliment.category);
    }
  }, [aliments]);

  return (
    <div>
      <div className="my-2">
        <Breadcrumb
          crumbs={crumbs}
          buttons={[
            <Button
              buttonText={`${urlParams[2] ? 'Editar' : 'Agregar'} alimento`}
              onClick={urlParams[2] ? editFood : addFood}
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
