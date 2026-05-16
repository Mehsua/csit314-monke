import pool from "../db.js";

class SystemUser {
    constructor({ userId, fullName, email, password }) 
    {
        this.userId = userId
        this.fullName = fullName
        this.email = email
        this.password = password
    }

    static async create(user) 
    {
        const [result] = await pool.query(
            `
            INSERT INTO SystemUser
            (fullName, email, password)
            VALUES (?, ?, ?)
            `,
            [
                user.fullName,
                user.email,
                user.password
            ]
        );

        user.userId = result.insertId;

        return user;
    }

    static async findByEmail(email) 
    {
        const [rows] = await pool.query(
        `
        SELECT *
        FROM SystemUser
        WHERE email = ?
        `,
        [email]
        );

        if (rows.length === 0) {
            return null;
        }

        return new SystemUser(rows[0]);
    }
}

export default SystemUser;