import pool from "../db.js";
import SystemUser from "./SystemUser.js";

class Donee extends SystemUser 
{
    constructor({ fullName, email, password }) 
    {
        super({ fullName, email, password });
    }

    static async create(donee) 
    {
        await SystemUser.create(donee);

        await pool.query(
            `
            INSERT INTO Donee (doneeId)
            VALUES (?)
            `,
            [donee.userId]
        );

        return donee;
    }
}

export default Donee;