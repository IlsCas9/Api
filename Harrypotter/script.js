
fetch(API_URL)
  .then(response => response.json())
  .then(data => mostrarPersonajes(data))
  .catch(error => console.error("Error al cargar los personajes:", error));

function mostrarPersonajes(personajes) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  personajes.forEach(personaje => {
    const ficha = `
      <div class="col-md-4">
        <div class="card mb-4">
          <img src="${personaje.image || 'default.jpg'}" class="card-img-top" alt="${personaje.name}">
          <div class="card-body">
            <h5 class="card-title">${personaje.name}</h5>
            <p class="card-text">Casa: ${personaje.house || "Harry Potter"}</p>
            <button class="btn btn-primary" onclick="mostrarDetalle('${personaje.name}')">Más Información</button>
          </div>
        </div>
      </div>`;
    contenedor.innerHTML += ficha;
  });
}

function filtrarPersonajes() {
  const texto = document.getElementById("buscar").value.toLowerCase();
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const filtrados = data.filter(personaje =>
        personaje.name.toLowerCase().includes(texto)
      );
      mostrarPersonajes(filtrados);
    });
}


function filtrarPorCasa() {
  const casa = document.getElementById("filtroCasa").value;
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const filtrados = data.filter(personaje => personaje.house === casa);
      mostrarPersonajes(filtrados);
    });
}


function mostrarDetalle(nombre) {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const personaje = data.find(p => p.name === nombre);
      document.getElementById("modalTitulo").innerText = personaje.name;
      document.getElementById("modalCuerpo").innerHTML = `
        <p><strong>Casa:</strong> ${personaje.house || "Gryffindor"}</p>
        <p><strong>Actor:</strong> ${personaje.actor || "Harry Potter"}</p>
        <p><strong>Patronus:</strong> ${personaje.patronus || "Desconocido"}</p>
        <p><strong>Fecha de Nacimiento:</strong> ${personaje.dateOfBirth || "Desconocida"}</p>`;
      new bootstrap.Modal(document.getElementById("modalDetalle")).show();
    });
}