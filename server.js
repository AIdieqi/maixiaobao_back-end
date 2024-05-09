const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const {Sequelize, DataTypes } = require('sequelize')

const app = new Koa()
app.use(bodyParser())

app.use(async (ctx, next) =>{
    ctx.set('Access-Control-Allow-Origin','*')

    ctx.set('Access-Control-Allow-Headers','Content-Type')
    if (ctx.method === 'OPTIONS'){
        ctx.body = 200
    } else {
        await next()
    }
})

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

const Expert = sequelize.define('Expert', {
    avatarSrc: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    location: DataTypes.STRING,
    certification: DataTypes.STRING,
    questionCount: { type: DataTypes.INTEGER, allowNull: false },
    bestAnswerCount: { type: DataTypes.INTEGER, allowNull: false },
    research: DataTypes.STRING,
    bio: DataTypes.STRING,
    qa: DataTypes.STRING,
});
Expert.sync()

const QuestionAnswer = sequelize.define('QuestionAnswer', {
    date: { type: DataTypes.STRING, allowNull: false },
    question: { type: DataTypes.STRING, allowNull: false },
    images: DataTypes.STRING,
    username: { type: DataTypes.STRING, allowNull: false },
    answer: DataTypes.STRING,
    views: { type: DataTypes.INTEGER, allowNull: false },
    answers: { type: DataTypes.INTEGER, allowNull: false },
    expertId: { type: DataTypes.INTEGER, allowNull: false }
});



QuestionAnswer.sync();

const Text = sequelize.define('Text', {
    textSrc: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    tag: DataTypes.STRING,
    num: { type: DataTypes.INTEGER, allowNull: false },
});
Text.sync()







app.use(async ctx => {
    if(ctx.url === '/expert' && ctx.method === 'GET') {
        const experts = await Expert.findAll()
        ctx.body = { experts }

    }
    else if(ctx.url === '/questionAnswer' && ctx.method === 'GET') {
        const questionAnswers = await QuestionAnswer.findAll()
        ctx.body = { questionAnswers }
    }
    else if(ctx.url === '/text' && ctx.method === 'GET') {
        const texts = await Text.findAll()
        ctx.body = { texts }
    }
})

app.listen(3000,() => {
    console.log('server start port 3000')
})