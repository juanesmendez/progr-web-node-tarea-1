let fs = require('fs');
let express = require('express');
const axios = require('axios');

let app = express();

app.listen('8081');

//var datosHtml = "<html><head></head><body></body></html>"; 

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

function escribirArchivo(arr, callback) {

    fs.writeFile('index.html', `<!doctype html>
    <html>
            <head>
                <!-- Required meta tags -->
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            
                <!-- Bootstrap CSS -->
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            
                <title>Hello, world!</title>
            </head>
            <body>
                <div class="container-fluid">
                    <div class="accordion" id="accordionExample">
                        <div class="card">
                            <div class="card-header" id="headingOne">
                                <h2 class="mb-0">
                                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        ${arr[0]['name']}
                                    </button>
                                </h2>
                            </div>
                
                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingTwo">
                                <h2 class="mb-0">
                                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                        ${arr[1]['name']}
                                    </button>
                                </h2>
                            </div>
                
                            <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                <div class="card-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>`, err => {
            console.log("Archivo creado correctamente.");
            fs.readFile('index.html', (err, data)=>{
                callback(data);
            });
        });
}

app.get("/", (req, res) => {
    pedirDatosComida((arr) => {
        //La linea siguiente es de prueba
        //res.send(datos);
        //console.log(datos[0]['name']);
        //Luego de pedir datos, crear el archivo html.

        escribirArchivo(arr, (datosArchivoRenderizado)=> {
            res.send(datosArchivoRenderizado.toString());
        });

    });
});