import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants"

const main = async () => {

    const orm = await MikroORM.init({
        entities: [], // database tables
        dbName: "serverOFQ",
        user: "postgres",
        password: "6244869asd",
        debug: !__prod__,
        type: "postgresql"
    })

}

main()



console.log("hello worldd")