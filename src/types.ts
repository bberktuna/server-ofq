import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response} from "express"

export type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    req: Request & {session: Express.Session} // ünlem isareti koymamak icin extra code
    res: Response
}