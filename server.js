require("dotenv").config();

const express = require('express')

const app = express()
app.use(express.json())


const mockUsers = [
    { id: 1, username: 'mahdi', displayNAme: 'Mahdi' },
    { id: 2, username: 'ali', displayNAme: 'Ali' },
    { id: 3, username: 'rasa', displayNAme: 'Rasa' },
    { id: 4, username: 'jasem', displayNAme: 'Jasem' },
    { id: 5, username: 'tina', displayNAme: 'Tina' },
    { id: 6, username: 'samin', displayNAme: 'Samin' },
    { id: 7, username: 'tara', displayNAme: 'Tara' },
    { id: 8, username: 'henry', displayNAme: 'Henry' }
]


app.get('/', (req, res) => {
    res.status(201).send({ msg: 'Hello world' })
})


app.get('/api/users', (req, res) => {
    const { query: { filter, value } } = req
    if (filter && value) return res.send(
        mockUsers.filter((user) => user[filter].includes(value))
    )

    return res.send(mockUsers)
})

app.post('/api/users', (req, res) => {
    const { body } = req
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body }
    mockUsers.push(newUser)
    console.log(body);
    res.status(201).send(newUser)

})

app.put('/api/users/:id', (req, res) => {
    const { body, params: { id }
    } = req
    const parseId = parseInt(id)
    if (isNaN(parseId)) return res.sendStatus(400)
    const findIndex = mockUsers.findIndex((user) => user.id === parseId)
    if (findIndex === -1) return res.sendStatus(404)

    mockUsers[findIndex] = { id: parseId, ...body }
    return res.sendStatus(200)
})


app.patch('/api/users/:id', (req, res) => {
    const { body, params: { id } } = req
    const parseId = parseInt(id)
    if (isNaN(parseId)) return res.sendStatus(400)
    const findIndex = mockUsers.findIndex((user) => user.id === parseId)
    if (findIndex === -1) return res.sendStatus(404)

    mockUsers[findIndex] = { ...mockUsers[findIndex], ...body }
    return res.sendStatus(200)

})

app.delete('/api/users/:id', (req, res) => {
    const { params: { id } } = req
    const parseId = parseInt(id)
    if (isNaN(parseId)) return res.sendStatus(400)
    const findIndex = mockUsers.findIndex((user) => user.id === parseId)
    if (findIndex === -1) return res.sendStatus(404)
    mockUsers.splice(findIndex, 1)

    mockUsers.forEach((element, index) => {
        element.id = index + 1
    });
    return res.sendStatus(200)
})





app.get('/api/users/:id', (req, res) => {
    const parsedID = parseInt(req.params.id)
    if (isNaN(parsedID)) {
        return res.status(400).send({ msg: 'abd request, invalid ID' })
    }

    const findUser = mockUsers.find((user) => user.id === parsedID)
    if (!findUser) {
        return res.sendStatus(404)
    }
    return res.send(findUser)

})


app.get('/api/products', (req, res) => {
    res.send({ id: 124, name: 'chicken breast', price: 94.99 })
})



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})