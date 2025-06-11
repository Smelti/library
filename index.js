const express = require('express')

const Book = require('./book')
const app = express()

app.use(express.json())

const PORT = 3000

app.get('/', (req, res) => {
    res.send('Сервер работает')
})

app.post('/api/user/login', (req, res) => {
    res.status(201)
    res.json({id: 1, mail: "test@mail.ru"})
})

const books = [
    new Book('Мастер и Маргарита', 'Роман о противостоянии добра и зла, любви и предательства, а также об авторской свободе и ценности искусства', 'М.А. Булгаков', 'Да', '', 'master.pdf'),
    new Book('Преступление и наказание', 'Роман о бедном студенте, который раздирается между своими желаниями и социальными нормами', 'Ф.М. Достоевский', 'Нет', '', 'crime.pdf'),
    new Book('Евгений Онегин', 'Роман в стихах, посвященный теме любви, дружбы и разочарования в жизни', 'А.С. Пушкин', 'Да', '', 'onegin.pdf'),
]

app.get('/api/books', (req, res) => {
    res.json(books)
})

app.get('/api/books/:id', (req, res) => {
    const { id } = req.params
    const book = books.find(el => el.id === id)

    if (book) {
        res.json(book)
    } else {
        return res.status(404).json('404 || Книга не не найдена')
    }
})

app.post('/api/books', (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body

    if (!title || !description) {
        return res.status(404).json('404 || Книга не не найдена')
    }

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
    books.push(newBook)

    res.status(201).json(newBook)
})

app.put('/api/books/:id', (req, res) => {
    const { id } = req.params
    const book = books.find(el => el.id === id)

    if (!book) {
        return res.status(404).json('404 || Книга не не найдена')
    }

    Object.assign(book, { ...req.body })

    res.json(book)
})

app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params

    const idx = books.findIndex(book => book.id === id)

    if (idx === -1) {
        return res.status(404).json('404 || Книга не не найдена')
    }

    books.splice(idx, 1)

    res.json('Удаление прошло успешно')
})


app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`)
})
