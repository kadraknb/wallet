export default getCurrencias = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const api = await response.json();
  return api;
};
