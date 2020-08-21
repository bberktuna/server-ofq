import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core"
import path from "path"


export default {
        entities: [Post], // database tables
        dbName: "serverOFQ",
        user: "postgres",
        password: "6244869asd",
        debug: !__prod__,
        type: "postgresql",
        migrations: {
            path: path.join(__dirname + '/migrations'), // path to the folder with migrations
            pattern: /^[\w-]+\d+\.[tj]s$/, 
        }
} as Parameters<typeof MikroORM.init>[0]