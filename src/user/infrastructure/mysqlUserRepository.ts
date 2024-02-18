import {UserRepository} from "../domain/userRepository";
import {Credentials} from "../domain/entity/credentials";
import {EncryptService} from "../domain/services/encryptService";
import {User} from "../domain/entity/user";
import {query} from "../../database/mysql";


export class MysqlUserRepository implements UserRepository{
    async generateUuid(name: string):Promise<string|any>{
        try {
            const namePrefix = name.slice(0, 3).toLowerCase();
            const randomNumbers = Array.from({ length: 3 }, () =>
                Math.floor(Math.random() * 10));
            let result = '';
            for (let i = 0; i < 3; i++) {
                result += namePrefix[i] + randomNumbers[i];
            }

            return result;
        }catch (e){
            console.log(e)
        }
    }
    async create(uuid: string, name: string, lastname: string, credentials: Credentials): Promise<User|any> {
        try {
            const sql = "INSERT INTO users (uuid, name, lastname, email, password) VALUES (?,?,?,?,?)"
            const params:any[]=[uuid,name,lastname,credentials.email,credentials.password]
            const [result]:any = await query(sql,params)
            return new User(uuid,name,lastname,credentials,null)
        }catch (e) {
            console.log(e)
            return null
        }
    }

    //TODO: CHANGE DELETE TO RETURN BOOL IN ORDER TO SUCCESS
    async delete(uuid: string): Promise<void> {
        try {
            const date = new Date()
            const sql ="UPDATE users SET deleted_at = ? WHERE uuid = ?";
            const params :any[] = [date,uuid]
            const [result]: any = await query(sql, params)
        }catch (e) {
            console.log(e)
        }
    }

    async getById(uuid: string): Promise<User|any> {
        try {
            const sql ="SELECT * FROM users WHERE uuid = ?";
            const params:any[]=[uuid]
            const [result]:any = await query(sql,params)

            const user = result[0]
            const credentials=new Credentials(user.email,user.password)

            return new User(uuid, user.name, user.lastname, credentials, user.deletedAt)
        }catch (e) {
            console.log(e)
            return null
        }
    }

    async login(credentials: Credentials, encryptService: EncryptService): Promise<any> {
        try {
            const sql = "SELECT * FROM users WHERE email= ? AND deleted_at IS NULL"
            const params:any[]=[credentials.email]
            const [result]:any = await query(sql,params)
            console.log(credentials.password)
            if (await encryptService.compare(credentials.password, result[0].password)){
                console.log("match")
                const user = result[0]
                const credentials=new Credentials(user.email,user.password)

                return new User(user.uuid, user.name, user.lastname, credentials, user.deletedAt)
            }
        }catch (e) {
            console.log(e)
            return null
        }
    }

    async update(uuid: string, user: User): Promise<any> {
        try {
            const sql ="UPDATE users SET name = ?, lastname = ?, email = ?, password = ? WHERE uuid = ?"
            const params:any[]=[user.name,user.lastname,user.credentials.email,user.credentials.password,uuid]
            await query(sql,params)
            return user
        }catch (e) {
            console.log(e)
            return null
        }
    }

}