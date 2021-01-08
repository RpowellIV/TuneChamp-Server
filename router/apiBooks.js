module.exports = (app, db) => { 


    app.post("/books",async (req, res) => {
        const {title, author, pubdate} = req.body;

        const newBook = await db.Boooks.create({
        title,
        author,
        pubdate
        })

    
        res.json({
            api: "book list",
            id: newBook.id,
            title,
            author,
            pubdate,

        });
    });

    app.get("/books", async (req, res) => {
        const books = await db.Boooks.findAll({
            attributes: ['title', 'author'],
           })
        console.log("Get test");
        
        res.json({
        is: "working" , 
        books
        })
    });

}