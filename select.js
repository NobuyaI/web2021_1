const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql = `
select chiba.id,chiba.市町村名,chiba2.一次産業人口,chiba2.二次産業人口,chiba2.三次産業人口 
from chiba
inner join chiba2
on chiba.id=chiba2.id;
`

db.serialize( () => {
	db.all( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		for( let data of row ) {
			console.log( data.id  + ' : ' + data.市町村名 + ' : ' + data.一次産業人口 + ' : ' + data.二次産業人口 + ' : ' + data.三次産業人口);
		}
	});
});
