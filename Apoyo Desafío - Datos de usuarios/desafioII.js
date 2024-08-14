/**
 * getUsers
 * Promise<Array<user>>
 * user: {
 *   // nombre, apellido, telefono, email, foto
 * email: string
 * cell: string
 * name: {title, first, last: string}
 * picture: {large: string, medium: string, thumbnail: string}
 * 
 * }
 * 
 */
const getUsers = async () => {
  try {
    let headersList = {
      // "Accept": "*/*", haceptamos de todo any to any
      "Accept": "application/json", //haceptamos solo respuestas JSON
    }

    let response = await fetch(
      "https://randomuser.me/api/?results=10",
      {
        method: "GET", //trae info
        headers: headersList //solo tipo json
      }
    );

    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`) //si la respuesta no esta ok 
    }

    let data = await response.json();
    return data.results; //caso de exito retorna la data de todos los usuarios
  } catch (error) {
    console.error("Error al consultar API", error) //retorna mensaje en la consola en caso de error, ejemplo   "https://randomuser.me/ape/?resuls=-10"
  }
}

//DOMManipulation en este caso es solo nombre
const DOMManipulation = ( () => {
  function cardsUser (users, id) {
    let htmlCartas = users.map(user => {
      return `
       <div>
          <img src="${user.picture.thumbnail}" alt="User Thumbnail" />
          <p>${user.name.title} ${user.name.first} ${user.name.last}</p>
          <p>${user.email}</p>
          <p>${user.phone}</p>
        </div>
    `
    }).join('')

    document.getElementById(id).innerHTML = htmlCartas
  }

  return { cardsUser }
})()

/**
 * Uso de promesas
 * Promesa
 *    .then()     // hacer uso del resultado
 *    .catch()    // manejo de errores
 *    .finally()  // ejecución de bloque "incondicional"
 */

getUsers()
  .then((users) => { return DOMManipulation.cardsUser(users, 'user-data')}) //funcion auto invocada
  .catch(error => alert(error))
  .finally(alert('Proceso finalizado'))