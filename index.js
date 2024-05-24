// Importar o Fastify
const fastify = require('fastify')({ logger: false });

// Definir a rota POST
fastify.post('/message', async (request, reply) => {
    // Extrair o corpo da requisição (JSON enviado pelo cliente)
    const {
        sendPhone,
        name,
        phone,
        dueDate,
        plan,
        street,
        number,
        district,
        city,
        state,
        adjunct
    } = request.body;

    // Codificar a mensagem em URL
    const encodedMessage = `Olá, meu nome é ${name} e vim pelo instagram!\nDesejo fazer uma assinatura do Plano ${plan} com a data de vencimento dia ${dueDate}.\n\nTelefone pra contato é ${phone}\nEndereço é ${street}, número ${number}, ${district}, ${city}-${state}.\nPonto de referência é ${adjunct}.`;

    // Retornar um status 200 e uma mensagem personalizada codificada em URL
    reply
        .code(200)
        .send({ 
            message: `https://wa.me/55${sendPhone}?text=${encodeURIComponent(encodedMessage)}`,
            status: 200
        });
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