let fs = require('fs');
let express = require('express');
const axios = require('axios');

let app = express();

app.listen('8081');

function pedirDatosComida(callback) {
    axios.get('https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/abb6016942f7db2797846988b039005c6ea62c2f/categories.json')
        .then((response) => {
            //console.log(response)
            //console.log(response.data);
            //console.log(typeof response.data);
            datos = response.data;
            console.log(datos);
            callback(datos);
        })
        .catch((err) => {
            console.log(err);
        });
}

function crearHTML(datos, callback){
    let html = `
    <!doctype html>
    <html>
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

        <title>Hello, world!</title>
    </head>`;
    html += `
    <body>
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <div class="container-fluid">
        <div class="accordion" id="accordionExample">`;

    let i = 0;
    for(let tipoComida of datos){
        console.log(tipoComida.name);
        html += `
        <div class="card">
            <div class="card-header" id="heading${i}">
                <h2 class="mb-0">
                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                        ${tipoComida.name}
                    </button>
                </h2>
            </div>
            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                <div class="card-body">`;
        for(let producto of tipoComida.products){
            html += `
                    <div class="row">
                        <div class="col-3">
                            <div class="card">
                                <img src="${[producto.image]}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${producto.name} [$${producto.price}] </h5>
                                    <p class="card-text">${producto.description}</p>
                                    <button type="button" class="btn btn-primary">Add to cart</button>
                                </div>
                            </div>  
                        </div>
                    </div>
            `;

        }
        html += `
                </div> 
            </div>
        </div>`;
        i = i + 1;
    }
    html += `
    </div>
    </body>
    </html>`;
    callback(html);
}

function escribirArchivo(arr, callback) {
    //crear el html antes en una variable y meter 'fs.writeFile en el callback de la función 
    crearHTML(arr, (contenidoHTML) => {
        fs.writeFile('index.html', contenidoHTML, err => {
            console.log("Archivo creado correctamente.");
            fs.readFile('index.html', (err, data)=>{
                callback(data);
            });
        });
    });


}

app.get("/", (req, res) => {
    pedirDatosComida((arr) => {
        escribirArchivo(arr, (datosArchivoRenderizado)=> {
            res.send(datosArchivoRenderizado.toString());
        });

    });
});