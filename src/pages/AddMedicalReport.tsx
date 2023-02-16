import React, { useEffect } from 'react';
import { Breadcrumb } from '../components/molecules/Breadcrumb';
import Form from '../components/organisms/Form';
import { useForm } from 'react-hook-form';
import { Theme } from '../components/atoms/theme';
import { Button } from '../components/atoms/Button';
import {
  useCreateMedicalReportMutation,
  useGetMedicalReportsQuery,
  useUpdateMedicalReportMutation,
} from '../redux/reduxQuery/medicalReportsApi';
import { ToastVariants } from '../constants/variants';
import { show } from '../redux/reducers/toast';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const AddMedicalReport = () => {
  const urlParams = window.location.pathname.split('/');
  const form = useForm();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [createMedicalReport] = useCreateMedicalReportMutation();
  const [updateMedicalReport] = useUpdateMedicalReportMutation();
  const {
    data: medicalReports,
    isFetching,
    refetch,
  } = useGetMedicalReportsQuery('');
  const crumbs = [
    {
      text: 'Informes médicos',
      path: '/informes-medicos',
    },
    {
      text: 'Agregar informe médico',
      path: '/agregar-informe-medico',
    },
  ];

  const formInputs = [
    [
      {
        id: 'name',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Nombre del paciente',
        required: true,
      },
      {
        id: 'patient',
        label: 'Email del paciente',
        type: 'text',
        placeholder: 'Email del paciente',
        required: true,
      },
      {
        id: 'initialDate',
        label: 'Fecha inicial',
        type: 'text',
        placeholder: 'Fecha inicial del informe médico',
        required: true,
      },
      {
        id: 'endDate',
        label: 'Fecha final',
        type: 'text',
        placeholder: 'Fecha final del informe médico',
        required: true,
      },
    ],
    [
      {
        id: 'nutritionalObjective',
        label: 'Objetivo nutricional',
        type: 'text',
        placeholder: 'Objetivo nutricional del paciente',
        required: true,
      },
      {
        id: 'nutritionalDiagnosis',
        label: 'Diagnóstico nutricional',
        type: 'text',
        placeholder: 'Diagnóstico nutricional del paciente',
        required: true,
      },
      {
        id: 'nutritionalRecommendations',
        label: 'Recomendaciones nutricionales',
        type: 'text',
        placeholder: 'Recomendaciones nutricionales del paciente',
        required: true,
      },
    ],
  ];

  const addMedicalReport = form.handleSubmit((data) => {
    try {
      data.nutritionist = user?.email;
      createMedicalReport(data).then((res: any) => {
        if (res.error) {
          show({
            message: res.error.data,
            variant: ToastVariants.DANGER,
          });
        } else {
          show({
            message: 'Informe médico creado con éxito',
            variant: ToastVariants.SUCCESS,
          });
          navigate('/informes-medicos');
        }
      });
    } catch (error) {
      show({
        message: 'Error al crear el informe médico',
        variant: ToastVariants.DANGER,
      });
    }
  });

  useEffect(() => {
    if (urlParams[2] && medicalReports) {
      const medicalReport = medicalReports.find(
        (medicalReport) => medicalReport._id === urlParams[2]
      );
      form.setValue('name', medicalReport.name);
      form.setValue('patient', medicalReport.patient);
      form.setValue('initialDate', medicalReport.initialDate);
      form.setValue('endDate', medicalReport.endDate);
      form.setValue('nutritionalObjective', medicalReport.nutritionalObjective);
      form.setValue('nutritionalDiagnosis', medicalReport.nutritionalDiagnosis);
      form.setValue(
        'nutritionalRecommendations',
        medicalReport.nutritionalRecommendations
      );
    }
  }, [medicalReports]);

  const update = form.handleSubmit((data) => {
    try {
      data.nutritionist = user?.email;
      updateMedicalReport({
        id: urlParams[2],
        ...data,
      }).then((res: any) => {
        if (res.error) {
          show({
            message: res.error.data,
            variant: ToastVariants.DANGER,
          });
        } else {
          show({
            message: 'Informe médico actualizado con éxito',
            variant: ToastVariants.SUCCESS,
          });
          navigate('/informes-medicos');
        }
      });
    } catch (error) {
      show({
        message: 'Error al actualizar el informe médico',
        variant: ToastVariants.DANGER,
      });
    }
  });

  return (
    <>
      <div>
        <Breadcrumb
          crumbs={crumbs}
          buttons={[
            <Button
              buttonText={`${
                urlParams[2] ? 'Actualizar' : 'Agregar'
              } informe médico`}
              onClick={urlParams[2] ? update : addMedicalReport}
              color={Theme.colors.primaries_000}
              noText={true}
            />,
          ]}
        />
        <div className="my-3">
          <Form
            {...form}
            numberOfColumns={2}
            formInputs={formInputs}
            customSubmit={true}
          />
        </div>
      </div>
    </>
  );
};
