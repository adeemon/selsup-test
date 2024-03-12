import React, { useEffect, useState } from 'react';
import { Mode } from 'fs';

import logo from './logo.svg';
import './App.css';

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

const getParameterById = (id: number, params: Param[]): Param => params.filter((parameter) => parameter.id === id)[0];

const getModel = (model: Model, params: Param[]) => {
  return model.paramValues.map((value) => {
    const param: Param = getParameterById(value.paramId, params);
    return param ? `${param.name} = ${value.value.toString()}` : '';
  })
}

const ParamEditor: React.FC<Props> = ({ ...props }) => {
  const [paramsArray, setParramsArray] = useState(props.model.paramValues);
  const paramsToRender = paramsArray.map((value) => {
    return (
      <>
        <p>{getParameterById(value.paramId, props.params).name}</p>
        <input defaultValue={value.value} onChange={(newValue) => setParramsArray((prev) =>
          prev.map((parameter) => {
            if (parameter.paramId === value.paramId) {
              return {
                paramId: parameter.paramId,
                value: newValue.target.value,
              }
            }
            return parameter;
          }))} />
      </>
    )
  })
  useEffect(() => {
    console.log(paramsArray);
  })
  return (
    <>
      {paramsToRender}
    </>
  )
}

const initialParams: Param[] = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string'
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string'
  }
]

const initialModel: Model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное'
    },
    {
      paramId: 2,
      value: 'макси'
    }
  ]
}

function App() {
  useEffect(() => {
    console.log(getModel(initialModel, initialParams));
  }, []);
  return (
    <div className="App">
      <ParamEditor params={initialParams} model={initialModel} />
    </div>
  );
}

export default App;
