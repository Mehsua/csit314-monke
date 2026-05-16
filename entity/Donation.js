import pool from "../db.js";

class Donation {
    static async calculateTotalByCampaign(campaignID) {
        const [rows] = await pool.query(
            `
            SELECT COALESCE(SUM(amount), 0) AS amountRaised
            FROM Donation
            WHERE campaignID = ?
            `,
            [campaignID]
        );

        return rows[0].amountRaised;
    }
}

export default Donation;