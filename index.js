const express = require('express');


const fs = require('fs');


const app = express();

app.use(express.json());


const HOSTNAME = '127.0.0.1';  
const PORT     = 4000;         


app.use(express.json());

app.get('/', (req, res) => {
    try {
        let datetime = new Date().toISOString();
        fs.writeFile(`current date-time.txt`, datetime, (err) => {
            if (err)
                throw err;
            else {
                fs.readFile(`current date-time.txt`, (err, data) => {
                    if (err)
                        throw err;
                    else
                        res.status(200).send({ message: "Successfully The Current Date & Time Displayed", datetime });
                });
            }
        });
    } catch (error) {
        console.log("Internal Server Error");
        res.status(404).send(error);
    }
});


app.post('/post-file', (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).send({ message: "Put The Input Inside The Body Tag" });
        }

        let datetime = new Date().toISOString();
        const fileName = `current date-time_post.txt`;

        fs.writeFile(fileName, content, (err) => {
            if (err) {
                throw err;
            } else {
                res.status(200).send({ message: "Successfully The File Is Post", fileName, datetime });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Application Running at http://${HOSTNAME}:${PORT}`);
})