import React from 'react';
import { Input } from './atoms/Input';
import axios from 'axios';

const AddProduct = () => {
  const [name, setName] = React.useState('');
  const [source, setSource] = React.useState('');
  const [characteristic, setCharacteristic] = React.useState('');
  const [benefits, setBenefits] = React.useState('');
  const [recomendations, setRecomendations] = React.useState('');

  const addProduct = async () => {
    const random = Math.floor(Math.random() * 10);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/aliments`, 

      {
        id: "5",
        name: 'HABAS COCIDAS',
        characteristic:
          'Pertenecen a la familia de las fabáceas, son semillas que se encuentran dentro de una vaina, de 2 a 9 por vaina y puestas en fila, que son tiernas cuando no han madurado, reniformes y de color blanco, verde, o rara vez, carmesí. ',
        benefits:
          'Su aporte de fibra, procedente de la piel, facilita la movilidad intestinal y evita el estreñimiento. También contiene vitaminas entre las cuales destacan la vitamina C, los folatos, tiamina y niacina. En cuanto a su contenido mineral, destacan el hierro y fósforo; y en menor cantidad, potasio y magnesio.',
        recomendations:
          ' Se recomienda no comer este alimentos en personas que tengan colon irritable, colitis, enfermedad de Crohn o que se encuentren en una dieta baja en FODMAP’s, por su alto contenido en fibra',
          source: "Lista de Intercambio de Alimentos, ADA. 2017/ Tabla de composición de Alimentos de Centroamérica, INCAP.2012/Haba, Mercado Alimentos FEN, 2018"
      })
      .then(function (response) {
        setName('');
        setSource('');
        setCharacteristic('');
        setBenefits('');
        setRecomendations('');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="w-1/2 m-auto flex flex-col gap-5">
      <h2 className="mt-3">Add Product</h2>
      <Input
        setFormValue={setName}
        value={name}
        type="text"
        labelText="Product"
        placeholderText="Product Name"
      />
      <Input
        setFormValue={setSource}
        value={source}
        type="text"
        labelText="Source"
        placeholderText="Source"
      />
      <Input
        setFormValue={setCharacteristic}
        value={characteristic}
        type="text"
        labelText="Characteristics"
        placeholderText="Characteristics"
      />
      <Input
        setFormValue={setBenefits}
        value={benefits}
        type="text"
        labelText="Benefits"
        placeholderText="Benefits"
      />
      <Input
        type="text"
        labelText="Recomendations"
        placeholderText="Recomendations"
        setFormValue={setRecomendations}
        value={recomendations}
      />
      <button
        className="bg-primary hover:bg-blue-500 transition delay-150 text-white font-bold py-2 px-4 rounded"
        onClick={() => addProduct()}
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
