import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT  || 5432,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,              
    password: process.env.PG_PASSWORD,        
})

class Model{

    constructor( config ) {
        
        this.db = pool;
        this.table_name = config.table_name;
        this.fields = config.fields;
        this.data = [];
        this.data.push([]);
        
    }
    
    get() {
        return this.data;
    } 

    first() {
        return this.data[0];
    } 

    set(data) {

        for (var index in this.fields) {
            var field = this.fields[index];
            if( typeof data[field] !== "undefined" ){

                if( field == 'id' ){
                    if(typeof this.data[0]['id'] == "undefined"){
                        this.data[0][field] = data[field];
                    }
                } else {
                    this.data[0][field] = data[field];
                }  
            }            
        }

        return this;
 
    } 

    async all(fields = '*') {
        
        var sql = `SELECT ${fields} FROM ${this.table_name} ;`;
        var recordset = await this.db.query(sql);
        this.data = recordset.rows;
        return this;

    } 

    async count() {
        
        var sql = `SELECT count(*) as rows FROM ${this.table_name};`;
        var recordset = await this.db.query(sql);
        return (recordset.rows[0].rows > 0) ? recordset.rows[0].rows : "0";

    }

    async allPaginated(page = 1, limit = 0, fields = '*') {

        var offset = (page - 1) * limit;

        var sql = `SELECT ${fields} FROM ${this.table_name} offset ${offset} limit ${limit} ;`;
        var recordset = await this.db.query(sql);
        this.data = recordset.rows;

        return this;

    } 

    async find(id) {

        var sql = `SELECT * FROM ${this.table_name} WHERE id=$1;`;
        var recordset = await this.db.query(sql, [id]);

        this.data = recordset.rows;
        return this;
        
    }

    async findByField(field, value) {

        var sql = `SELECT * FROM ${this.table_name} WHERE ${field}=$1;`;
        var recordset = await this.db.query(sql, [value]);

        this.data = recordset.rows;
        return this;
        
    }

    async create(data){

        this.set(data);
        var recordset =  await this.insert(this.data[0]);
        this.data = recordset.rows;
        return this;

    }

    async save(){

        var recordset = null;
        if(this.data[0].id && this.data[0].id > 0){
            recordset = await this.update(this.data[0].id, this.data[0]);
        }
        else{
            recordset = await this.insert(this.data[0]);
        }
        this.data = recordset.rows;
        return this;

    }

    async insert(data) {

        var keys = []
        var values = []
        var valuesId = []

        var id = 1

        for(var element in data){
            // não deixa atualizar o id
            if(element != 'id'){
                keys.push(element);
                valuesId.push('$'+ id)
                values.push( data[element] );
                id++;
            }
        }

        var sql = `INSERT INTO ${this.table_name} (${keys}) VALUES (${valuesId}) RETURNING *;`
        //console.log('insert: ', sql, values)
        return await this.db.query(sql, values);
        
    }  

    async update(id, data) {

        var keys = []
        var values = []

        var idx = 1

        for(var element in data){
            // não deixa atualizar o id
            if(element != 'id'){
                keys.push( `${element}=$${idx}` );
                values.push( data[element] );
                idx++; 
            }
        }

        values.push( id );

        var sql = `UPDATE ${this.table_name} SET ${keys} WHERE id=$${idx} RETURNING *;`;
        //console.log(sql)
        return await this.db.query(sql, values);
} 

    async remove(id) {

        var sql = `DELETE FROM ${this.table_name} WHERE id=$1;`;
        var recordset = await this.db.query(sql, [id]); 
        if(recordset.rowCount == 0){
            throw "Error: Registro não localizado";
        }
        return recordset.rowCount;
               
    } 

    async query(text, params) {

        var recordset = await this.db.query(text, params);  
        this.data = recordset.rows;
        return this;  

    }
}

export default Model;