const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql = `
insert into chiba ("市町村名","人口","面積") values ("鋸南町",6712,45.17);
`

db.serialize( () => {
	db.run( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "データを追加しました" );
	});
});
