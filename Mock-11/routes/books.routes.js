const express = require("express")
const bookRouter = express.Router()
const { BookModel } = require("../model/book.model")
const jwt = require("jsonwebtoken")
const { model } = require("mongoose")
require("dotenv").config()
const { validate } = require("../middleware/validator")
const { record } = require("../middleware/record")


bookRouter.post("/books", validate, async (req, res) => {
    let data = req.body
    try {
        let newBook = await BookModel(data)
        newBook.save()
        res.status(201).send({
            "msg": "New Book added to DB"
        })
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})

bookRouter.get("/books", async (req, res) => {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.secretCode)

    try {
        if (decode) {
            const books = await BookModel.find()
            res.status(200).send(books)
        }
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})

bookRouter.get("/books/:id", async (req, res) => {
    let ID = req.params.id

    try {
        const books = await BookModel.findOne({ _id: ID })
        res.status(200).send(books)
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})

bookRouter.get("/books?category", async (req, res) => {
    let quer = req.query.category
    let books = await BookModel.find({ category: quer })
    console.log(quer)
    res.status(200).send(books)
})

bookRouter.get("/books/author&category", async (req, res) => {
    let aut = req.query.author
    let cat = req.query.category
    let books = await BookModel.find({ author: aut, category: cat })
    res.status(200).send(books)
})

bookRouter.patch("/books/:id", record, async (req, res) => {
    let ID = req.params.id
    let updated = req.body

    try {
        await BookModel.findByIdAndUpdate({ _id: ID }, updated)
        res.status(204).send({
            "msg": "Book data has been updated"
        })
    } catch (error) {
        res.send(error)
    }
})


bookRouter.delete("/books/:id", record, async (req, res) => {
    let ID = req.params.id

    try {
        await BookModel.findByIdAndDelete({ _id: ID })
        res.status(202).send({
            "msg": "Book data has been deleted"
        })
    } catch (error) {
        res.send(error)
    }
})

module.exports = {
    bookRouter
}
