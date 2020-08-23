import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core"
import { __prod__, COOKIE_NAME } from "./constants"
import microConfig from "./mikro-orm.config"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import redis from "redis"
import session from "express-session"
import connectRedis from "connect-redis"
import cors from "cors"

import { HelloResolver } from "./resolvers/hello"
import { PostResolver } from "./resolvers/post"
import { UserResolver } from "./resolvers/user"



const main = async () => {

    const orm = await MikroORM.init(microConfig)
    orm.getMigrator().up()




    const app = express()

    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()

    app.use(
        cors({
            origin: "http://localhost:19002",
            credentials: true
    }))

    app.use(
        session({
            name: COOKIE_NAME, // random cookie name
            store: new RedisStore({
                client: redisClient,
                disableTouch: true,
            }),
            secret: "randomstring",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
                httpOnly: true, // you cant reach your cookie in the frontend
                secure: __prod__,// cookie only works in https
                //LLOK THIS UP MIGHT NEED TO SET IT FALSE
                sameSite: "lax"
            }
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                HelloResolver,
                PostResolver,
                UserResolver
            ],
            validate: false,
        }), // awatinig it cause it returns promise
        context: ({req, res}) => ({ em: orm.em, req, res})
    })
    apolloServer.applyMiddleware({
        app, 
        cors: false,

    })




    app.listen(4000, () => {
        console.log("server started on localhost 4000000")
    })

}

main().catch((err) => {
    console.log(err)
})
