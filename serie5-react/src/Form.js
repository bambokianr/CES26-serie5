import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

function Form() {
  const [dataForm, setDataForm] = useState({ name: "", age: 0 });
  const [feedbackForm, setFeedbackForm] = useState("");

  const handleChangeInputValue = useCallback((e, inputKey) => {
    const value = inputKey === "age" ? parseInt(e.target.value) : e.target.value;
    setDataForm({ ...dataForm, [inputKey]: value });
  }, [dataForm]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    await axios.post('http://localhost:8081/data_form', dataForm)
      .then(res => console.log('[RES]', res))
      .catch(err => console.log('[ERR]', err));
    
    setDataForm({ name: "", age: 0 });
    setFeedbackForm("");
  }, [dataForm]);

  useEffect(() => {
    const { name, age } = dataForm;
    if(age !== 0) setFeedbackForm(`A idade de ${name} é ${age >= 18 ? "maior" : "menor"} que 18 anos.`);
    if(Number.isNaN(age)) setFeedbackForm('');
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
        <button disabled={!(dataForm?.name !== "" && dataForm?.age !== 0)} type="submit">Enviar</button>
      </form>
    </>
  );
}
export default Form;
