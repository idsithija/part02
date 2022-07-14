import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'


const getAllPersons = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data)
}

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then(response => response.data)
}

const deletePerson = (id, newPerson) => {
  return axios.delete(`${baseUrl}/${id}`, newPerson)
}

const update = (id, updatePerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatePerson);
  return request.then(response => response.data);
}

export default { getAllPersons, create, deletePerson, update }