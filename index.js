// Importar o Fastify
const fastify = require('fastify')({ logger: true });

// Definir a rota POST
fastify.post('/message', async (request, reply) => {
    // Extrair o corpo da requisição (JSON enviado pelo cliente)
    const {
        name,
        plan
    } = request.body;

    const telefone = 81971172091
    // Codificar a mensagem em URL
    const encodedMessage = `Olá, ${name} with ${plan}!`;

    // Retornar um status 200 e uma mensagem personalizada codificada em URL
    reply
        .code(200)
        .send({ message: `https://wa.me/55${telefone}?text=${encodeURIComponent(encodedMessage)}`, status: 200 });
});

// Configurações do servidor
const options = {
    logger: true,
    port: 3000,
};

// Iniciar o servidor
const start = async () => {
    try {
        await fastify.listen(options);
        fastify.log.info(`Servidor rodando em http://localhost:${options.port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();