import React, { useState, useCallback, useEffect } from 'react';

function Form() {
  const [dataForm, setDataForm] = useState({});
  const [feedbackForm, setFeedbackForm] = useState("");

  const handleChangeInputValue = useCallback((e, inputKey) => {
    const value = inputKey === "age" ? parseInt(e.target.value) : e.target.value;
    setDataForm({ ...dataForm, [inputKey]: value });
  }, [dataForm]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const { name, age } = dataForm;
    setFeedbackForm(`A idade de ${name} é ${age >= 18 ? "maior" : "menor"} que 18 anos.`);
    
    console.log('teste');
  }, [dataForm]);

  useEffect(() => {
    console.log('aaa', dataForm);
  }, [dataForm]);

  return (
    <>
      <h3>Formulário</h3>
      {feedbackForm !== '' && <p>{feedbackForm}</p>}
      <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            Nome <input type="text" name="name" value={dataForm?.name} onChange={(e) => handleChangeInputValue(e, "name")} />
          </label>
          <br/>
          <label>
            Idade <input type="number" name="age" value={dataForm?.age} onChange={(e) => handleChangeInputValue(e, "age")} />
          </label>
          <br/><br/>
        <button disabled={!(dataForm?.name && dataForm?.name !== "" && dataForm?.age && dataForm?.age !== 0)} type="submit">Enviar</button>
      </form>
    </>
  );
}
export default Form;
