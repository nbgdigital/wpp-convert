// Importar o Fastify
const fastify = require('fastify')({ logger: false });

// Checar disponibilidade
fastify.get('/check', async (request, reply) => {
    reply.code(200).send({ message: 'Success!' });
})

// Definir a rota POST
fastify.post('/message', async (request, reply) => {
    // Extrair o corpo da requisição (JSON enviado pelo cliente)
    const {
        sendPhone,
        fullName,
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

    const splitName = fullName.split(' ');
    const name = splitName[0];

    // Codificar a mensagem em URL
    const encodedMessage = `Olá, meu nome é ${name} e vim pelo instagram!\n\n*Nome completo*: ${fullName}\nTelefone pra contato: ${phone}\nPlano: ${plan}\nData de vencimento: Dia ${dueDate}\n\nEndereço: ${street}, número ${number}, ${district}, ${city}-${state}\nPonto de referência ${adjunct}`;

    // Retornar um status 200 e uma mensagem personalizada codificada em URL
    reply
        .code(200)
        .send({ 
            message: `https://wa.me/55${sendPhone}?text=${encodeURI(encodedMessage)}`,
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