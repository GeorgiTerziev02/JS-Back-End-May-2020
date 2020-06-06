const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds');
const cats = require('../data/cats');

module.exports = async (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/cats/add-cat') {
        if (req.method === 'GET') {
            let filePath = path.normalize(
                path.join(__dirname, '../views/addCat.html')
            );

            await fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.log(err);
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
                    res.write('Not Found');
                    res.end();
                    return;
                }

                let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
                let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder);

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                res.write(modifiedData);
                res.end();
            });
        } else if (req.method === 'POST') {
            let form = new formidable.IncomingForm();
            form.uploadDir = path.normalize(
                path.join(__dirname, '../content/images')
            );

            form.parse(req, async (err, fields, files) => {
                if(err){
                    throw err;
                }
                const currentCatId = cats.length === 0 ? 0 : cats[cats.length - 1].id + 1; 
                cats.push({ 
                    id: currentCatId,
                    name: fields.name,
                    description: fields.description,
                    breed: fields.breed,
                    image: files.upload.name });


                await fs.writeFile(path.normalize(path.join(__dirname, '../data/cats.json')), JSON.stringify(cats), 'utf8', function (err) { });

                res.writeHead(301, { 'Location': '/' });
                res.end();
            })
        }
    } else if (pathname === '/cats/add-breed') {
        if (req.method === 'GET') {
            let filePath = path.normalize(
                path.join(__dirname, '../views/addBreed.html')
            );

            await fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.log(err);
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
                    res.write('Not Found');
                    res.end();
                    return;
                }

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                res.write(data);
                res.end();
            });
        } else if (req.method === 'POST') {
            let formData = '';

            req.on('data', (data) => {
                formData += data;
                if (formData.length > 1e6)
                    req.connection.destroy();
            });


            req.on('end', async function () {
                let body = qs.parse(formData);

                if (body.breed.length < 3 || breeds.includes(body.breed)) {
                    res.writeHead(301, {
                        'Location': '/cats/add-breed'
                    });

                    res.end();
                    return;
                }

                let breedsFilePath = path.normalize(
                    path.join(__dirname, '../data/breeds.json')
                );

                breeds.push(body.breed);
                let json = JSON.stringify(breeds);

                await fs.writeFile(breedsFilePath, json, 'utf-8', () => console.log('Added'));

                res.writeHead(301, {
                    'Location': '/'
                });

                res.end();
            });
        }
    } else {
        return true;
    }
}