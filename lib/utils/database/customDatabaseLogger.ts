type DatabaseMessage = [
    string,
    {
        plain: boolean,
        raw: boolean,
        logging: (...msg: unknown[]) => void,
        transaction: {
            sequelize: unknown,
            savepoints: unknown[],
            _afterCommitHooks: unknown[],
            options: unknown,
            parent: unknown,
            name: unknown,
            id: string,
            connection: unknown,
        },
        include: unknown[],
        hooks: boolean,
        validate: boolean,
        fields: string[],
        defaultFields: string[],
        returning: boolean,
        hasTrigger: unknown,
        dialect: string,
        dialectModule: unknown,
        dialectModulePath: unknown,
        protocol: string,
        define: unknown,
        query: unknown,
        sync: unknown,
        timezone: string,
        standardConformingStrings: boolean,
        omitNull: boolean,
        native: boolean,
        replication: boolean,
        ssl: unknown,
        pool: unknown,
        quoteIdentifiers: boolean,
        retry: {
            max: number,
            match: unknown[],
        },
        transactionType: string,
        isolationLevel: unknown,
        databaseVersion: number,
        typeValidation: boolean,
        benchmark: boolean,
        minifyAliases: boolean,
        logQueryParameters: boolean,
        attributeBehavior: string,
        port: number,
        models: string[],
        storage: string,
        username: string,
        password: string,
        database: string,
        type: string,
        instance: unknown,
        model: unknown,
        bind: unknown[],
    }
];

const customDatabaseLogger = (...msg: unknown[]) => {
    const [message, options] = msg as DatabaseMessage;

    options.fields?.length ? console.log(`\x1b[36m${message}\x1b[0m`) : console.log(`${message}`);
    
    if (options.fields && options.bind) {
        const fields = options.fields;
        const bind = options.bind;

        const values = fields.map((field, index) => {
            return `${field}: ${bind[index]}`;
        });

        console.log(values.join("\n"));
        console.log("\n")
    }
};

export default customDatabaseLogger;

// [
//     'Executing (b7726dda-61b6-441d-9767-252d74a7c6e9): INSERT INTO `enderecos` (`fk_jogador_id`,`logradouro`,`numero`,`bairro`,`cidade`,`cep`,`estado`,`pais`,`createdAt`,`updatedAt`) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);',
//     {
//       plain: false,
//       raw: false,
//       logging: [Function: customDatabaseLogger],
//       transaction: Transaction {
//         sequelize: [Sequelize],
//         savepoints: [],
//         _afterCommitHooks: [],
//         options: [Object],
//         parent: undefined,
//         name: undefined,
//         id: 'b7726dda-61b6-441d-9767-252d74a7c6e9',
//         connection: [Database]
//       },
//       include: [ [Object] ],
//       hooks: true,
//       validate: true,
//       fields: [
//         'fk_jogador_id', 'logradouro',
//         'numero',        'bairro',
//         'cidade',        'cep',
//         'estado',        'pais',
//         'createdAt',     'updatedAt',
//         'deletedAt'
//       ],
//       defaultFields: [
//         'fk_jogador_id', 'logradouro',
//         'numero',        'bairro',
//         'cidade',        'cep',
//         'estado',        'pais',
//         'createdAt',     'updatedAt',
//         'deletedAt'
//       ],
//       returning: true,
//       hasTrigger: undefined,
//       dialect: 'sqlite',
//       dialectModule: null,
//       dialectModulePath: null,
//       protocol: 'tcp',
//       define: {},
//       query: {},
//       sync: {},
//       timezone: '+00:00',
//       standardConformingStrings: true,
//       omitNull: false,
//       native: false,
//       replication: false,
//       ssl: undefined,
//       pool: {},
//       quoteIdentifiers: true,
//       retry: { max: 5, match: [Array] },
//       transactionType: 'DEFERRED',
//       isolationLevel: null,
//       databaseVersion: 0,
//       typeValidation: false,
//       benchmark: false,
//       minifyAliases: false,
//       logQueryParameters: false,
//       attributeBehavior: 'throw',
//       port: 3306,
//       models: [
//         'C:\\Users\\caiod\\Desktop\\campeonato-municipal\\server\\src\\models'
//       ],
//       storage: './server/src/database/database.sqlite3',
//       username: '',
//       password: '',
//       database: '',
//       type: 'INSERT',
//       instance: EnderecoModel {
//         dataValues: [Object],
//         _previousDataValues: [Object],
//         uniqno: 1,
//         _changed: [Set],
//         _options: [Object],
//         isNewRecord: true,
//         jogador: [JogadorModel]
//       },
//       model: EnderecoModel,
//       bind: [
//         'ab121e60-3873-4e32-b316-7405ba845cf3',
//         'Rua da Silva',
//         '123',
//         'Bairro da Silva',
//         'Cidade da Silva',
//         '12345678',
//         'Estado da Silva',
//         'Pais da Silva',
//         '2023-12-22 13:39:51.025 +00:00',
//         '2023-12-22 13:39:51.025 +00:00'
//       ]
//     }
//   ]
//   [
//     'Executing (b7726dda-61b6-441d-9767-252d74a7c6e9): ROLLBACK;',
//     {
//       plain: false,
//       raw: true,
//       logging: [Function: customDatabaseLogger],
//       type: 'DEFERRED',
//       isolationLevel: null,
//       readOnly: false,
//       transaction: Transaction {
//         sequelize: [Sequelize],
//         savepoints: [],
//         _afterCommitHooks: [],
//         options: [Object],
//         parent: undefined,
//         name: undefined,
//         id: 'b7726dda-61b6-441d-9767-252d74a7c6e9',
//         connection: [Database],
//         finished: 'rollback'
//       },
//       supportsSearchPath: false,
//       completesTransaction: true
//     }
//   ]
//   POST /enderecos 404 417.058 ms - 1193
  