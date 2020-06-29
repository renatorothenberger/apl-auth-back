const neo4j = require('neo4j-driver');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const cryptPassword = require('../utils/utils');

const authConfig = require('../utils/auth.json');

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'rafa12rafa'));
const session = driver.session();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

exports.createUser = async (req, res) => {    

    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    // const userPassword = bcrypt.hashSync(req.body.password, cryptPassword.salt);

    try {
        const isAlreadyRegistered = 
            await session.run(
                `MATCH (n { email: '${userEmail}' })
                RETURN n`
            );
            if (isAlreadyRegistered.records.length) {
                res.status(200).send('e-mail já cadastrado');
            } else {
                try {
                    const create =
                        await session.run(
                            `CREATE (n:User {name: '${userName}', email: '${userEmail}', password: '${userPassword}'})
                            RETURN n`
                        );
                            
                        const singleRecord = create.records[0];
                        const node = singleRecord.get(0);
                    
                        res.status(201).send(`Usuário ${userName} cadastrado com sucesso`)
            
                } finally {
                    //  await session.close();
                }
            }
    } finally { 
        // await session.close();
    }
};

exports.verifyUser = async (req, res) => {
    
    const userEmail = req.query.email;
    const userPassword = req.query.password;

    try {
        const isUser = 
            await session.run(
                `MATCH (n { email: '${userEmail}', password: '${userPassword}' })
                RETURN n`
            );
            // session.close();
            if(isUser.records.length){
                const user = isUser.records[0]._fields[0].properties
                res.status(200).send({name: user.name, token: generateToken({email: user.email})});
            } else {
                res.status(200).send('E-mail ou Senha incorreto');
            }
    } finally {
        // await session.close();
    }
};