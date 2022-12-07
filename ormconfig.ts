module.exports = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'cursonestjs',
    entities: ['dist/**/*.entity.js'],
    migrations: [`dist/migrations/*{.js, .ts}`],
    cli : {
        migrationsDir: 'src/migrations'
    }
}
