import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

function Form() {
  const [dataForm, setDataForm] = useState({ name: "", age: 0 });
  const [dataTable, setDataTable] = useState([]);
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

  const handleAjaxButton = useCallback(() => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const resArray = this.responseText.split('\n');
        const resToState = [];
        resArray.map(json => resToState.push(JSON.parse(json)));
        setDataTable(resToState);
      }
    };
    xhttp.open("GET", "http://localhost:8081/data_form", true);
    xhttp.send();
  }, []);

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
      <br/><br/><br/>
      <button id="btn" type="button" onClick={handleAjaxButton}>Mostrar tabela</button>
      <br/><br/>
      {dataTable.length !== 0 && 
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map(row => {
              return (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.age}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
    </>
  );
}
export default Form;
