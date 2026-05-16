import pool from "../db.js";
import SystemUser from "./SystemUser.js";

class Fundraiser extends SystemUser 
{
    constructor({ fullName, email, password }) 
    {
        super(
            {
                fullName,
                email,
                password
            }
        )
    }

    static async create(fundraiser) 
    {
        // create parent user first
        await SystemUser.create(fundraiser)

        // create fundraiser record
        const [result] = await pool.query(
            `
            INSERT INTO Fundraiser
            (fundraiserId)
            VALUES (?)
            `,
            [fundraiser.userId]
        );

        return fundraiser;
    }
}

export default Fundraiser;