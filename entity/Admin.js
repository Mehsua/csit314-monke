import pool from "../db.js";
import SystemUser from "./SystemUser.js";

class Admin extends SystemUser 
{
    constructor({ fullName, email, password }) 
    {
        super({ fullName, email, password });
    }

    static async create(admin) 
    {
        await SystemUser.create(admin);

        await pool.query(
            `
            INSERT INTO Admin (adminId)
            VALUES (?)
            `,
            [admin.userId]
        );

        return admin;
    }
}

export default Admin;