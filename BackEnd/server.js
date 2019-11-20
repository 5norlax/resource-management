const express = require('express');
const app = express();
const cors = require('cors')
const fs = require('fs')

// enable middleware || pipeline
app.use(express.json())
app.use(cors())

// PORT
const PORT = process.env.PORT || 5000;

// Mock Data
var resources
fs.readFile('./MockData/Resources.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return 
    }
    resources = JSON.parse(jsonString)
})

// GET ALL
app.get('/api/resources', (req, res) => {
    res.send(resources);
});

// GET Table Data
app.get('/api/resources/table', (req, res) => {
    let tableData = []
    resources.forEach(r => {
        data = {
            Id: r.Id,
            FirstName: r.FirstName,
            LastName: r.LastName,
            Role: r.Role,
            Email: r.Email,
            Skills: r.Skills
        }
        tableData.push(data)
    })
    res.send(tableData);
});

// GET Resource By ID
app.get('/api/resources/:id', (req, res) => {
    // Find Resource
    let resource = resources.find(r => r.Id === parseInt(req.params.id));
    // 404 Not Found
    if (!resource) return res.status(404).send('The resource with the given ID was not found');
    res.send(resource);
});

// POST Resource By ID
app.post('/api/resource', (req, res) => {
    // 400 Bad Request
    // if (error) return res.status(400).send(result.error.details[0].message);
    let resource = req.body.data
    resource.Id = (Math.max.apply(Math, resources.map(function(o) { return o.Id; }))) + 1
    resources.push(resource);
    res.send(resource);
});

// UPDATE Resource By ID
app.put('/api/resources/:id', (req, res) => {
    // Find Resource
    let resource = resources.find(r => r.Id === parseInt(req.params.id))
    // 404 Not Found
    if (!resource) return res.status(404).send('The resource with the given ID was not found');
    // Update Resource
    resource = req.body.data
    let update = resources.findIndex(x => x.Id == resource.Id);
    resources[update] = resource
    res.send(resource);
});

// // DELETE Resource By ID [{NOT CURRNENTLY WORKING}]
// app.delete('/api/resources/:id', (req, res) => {
//     // Find Resource
//     let resource = resources.find(r => r.Id === parseInt(req.params.id));
//     // 404 Not Found
//     if (!resource) return res.status(404).send('The resource with the given ID was not found');
//     // Delete
//     let index = resources.indexOf(resource);
//     resources.splice(index, 1);
//     // Return
//     res.send(resource);
// });

// PORT
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});