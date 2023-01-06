import React from "react";
import { Input } from "./atoms/Input";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [source, setSource] = React.useState("");
  const [characteristic, setCharacteristic] = React.useState("");
  const [benefits, setBenefits] = React.useState("");
  const [recomendations, setRecomendations] = React.useState("");

  const addProduct = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/aliments`, {
        id: "2",
        name: name,
        source: source,
        characteristic: characteristic,
        benefits: benefits,
        recomendations: recomendations,
      })
      .then(function (response) {
        console.log(response);
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
