import { Resolver, Query, Ctx, Int, Arg, Mutation } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";


@Resolver()
export class PostResolver {
    

    @Query(() => [Post])
    posts(
        @Ctx() {em} : MyContext 
        // 1 ) normally its ctx: MyContext but we destructred it
    ): Promise<Post[] > {
        return em.find(Post, {}) // 2 ) and it was ctx.em.find
    }


    @Query(() => Post, {nullable: true})
    post(
        @Arg("id", () => Int ) id: number,
        @Ctx() {em} : MyContext 
        // 1 ) normally its ctx: MyContext but we destructred it
    ): Promise< Post | null > {
        return em.findOne(Post, { id }) // 2 ) and it was ctx.em.find
    }


    @Mutation(() => Post)
    async createPost(
        @Arg("title") title: string,
        @Ctx() {em} : MyContext 
        // 1 ) normally its ctx: MyContext but we destructred it
    ): Promise< Post > {
        const post = em.create(Post, { title }) // 2 ) and it was ctx.em.find
        await em.persistAndFlush(post)
        return post
    }
}