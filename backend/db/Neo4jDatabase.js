const mongo4j = require('mongo4j');

const connectNeo4jDatabase = () => {
    mongo4j.init('neo4j://localhost:7687/', {
      user: 'neo4j',
      pass: 'Barcelona#6'
    });
    console.log(`neo4j is connected`);
}

module.exports = connectNeo4jDatabase
