import express from 'express'
import sql from 'mssql'
import { sqlConfig } from './server.js';

const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();
const routes = express.Router()

routes.get('/', async (req, res)=>{
   try{
        const { recordset } =  await pool.query`select * from Registros`
        return res.status(200).json(recordset)
   }
   catch(error){
        return res.status(501).json('registros não encontrados')
   }
})

routes.get('/chamado/:id', async (req, res)=>{
    try{
        const { id } = req.params 
        const { recordset } =  await pool.query`SELECT * from Registros WHERE id = ${ id }`
         return res.status(200).json(recordset)
    }
    catch(error){
         return res.status(501).json('Parça seu Id não foi indentificado')
    }
 })
 
routes.post('/chamado/novo', async (req, res)=>{
    try{
        const { data, nome, descricao} = req.body;
        await pool.query`insert into Registros values(${data},${nome},${descricao} )`
        return res.status(201).json(`Foi!`)
    }

    catch(error){
        return res.status(501).json('Deu erro no chamado parça')
    }
})

export default routes