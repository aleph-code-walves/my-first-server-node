import Fastify from 'fastify'
import cors from '@fastify/cors'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors,{
        origin: true, // qualquer aplicação acessa essa aplicação para consumir o meu backend
    })

    fastify.get('/pools/count' , async () => { // aguardar a operação finalizar para executtar o restante do codigo
        const count = await prisma.pool.count()
        const details = await prisma.pool.findFirst()
    
        return {count, details}
    })

     await fastify.listen({port:3333 /*host: '0.0.0.0'*/})
}

bootstrap()