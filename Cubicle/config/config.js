module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl: `mongodb+srv://terziev:${process.env.DB_PASSWORD}@cluster0-3me0t.mongodb.net/cubicle?retryWrites=true&w=majority`
    },
    production: {}
};