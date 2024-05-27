// Importar o Fastify
const fastify = require('fastify')({ logger: false });

// Checar disponibilidade
fastify.get('/check', async (request, reply) => {
    reply.code(200).send({ message: 'Success!' });
})

// Verificar se é divisivel por 5
fastify.post('/divided', async (request, reply) => {
    const msg = 'test'

    reply.code(200).send({ message: `${msg}` })
})

// Route test
fastify.post('/test', async (request, reply) => {
    const { number } = request.body
    const convertToNumber = parseFloat(number);


    if (!isNaN(convertToNumber)) {
        reply.send({ message: "É numero"})
    } else {
        reply.send({ message: "Não é numero" })
    }
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
    const encodedMessage = `Olá, meu nome é ${name} e vim pelo instagram!\n\n*Nome completo*: ${fullName}\n*Telefone pra contato*: ${phone}\n*Plano*: ${plan}\n*Data de vencimento*: Dia ${dueDate}\n*Endereço*: ${street}, número ${number}, ${district}, ${city}-${state}\n*Ponto de referência*: ${adjunct}`;

    // Retornar um status 200 e uma mensagem personalizada codificada em URL
    reply
        .code(200)
        .send({ 
            message: `https://wa.me/55${sendPhone}?text=${encodeURIComponent(encodedMessage)}`,
        });
});

const PORT = process.env.PORT || 8080;

const start = async () => {
    try {
        await fastify.listen({port: PORT, host: '0.0.0.0'});
        fastify.log.info(`Servidor rodando na porta ${PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();