const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');

const dbPath = path.join(__dirname, '../config/database.json');

module.exports = class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4();
        this.name = name || 'No name';
        this.description = description;
        this.imageUrl = imageUrl || 'placeholder';
        this.difficulty = difficulty || 0;
    }

    save() {
        const cube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        };

        fs.readFile(dbPath, 'utf-8', (err, db) => {
            if (err) {
                throw err;
            }

            let cubes = JSON.parse(db);
            cubes.push(cube);
            fs.writeFile(dbPath, JSON.stringify(cubes), (err) => {
                if (err) {
                    throw err;
                }

                console.log('The new cube was successfully stored!');
            })
        })
    }
}