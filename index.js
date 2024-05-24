// Importar o Fastify
const fastify = require('fastify')({ logger: false });

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

const PORT = process.env.PORT || 8080;

const start = async () => {
    try {
        await fastify.listen(PORT, '0.0.0.0');
        fastify.log.info(`Servidor rodando na porta ${PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();