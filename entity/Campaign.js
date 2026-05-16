import pool from "../db.js"

class Campaign 
{
    constructor({campaignId, title, category, description, targetAmount, deadline, createdBy}) 
    {
        this.campaignId = campaignId;
        this.title = title;
        this.category = category;
        this.description = description;
        this.targetAmount = targetAmount;
        this.deadline = deadline;
        this.createdBy = createdBy;
    }

    static async findByFundraiser(fundraiserID) 
    {
        const [rows] = await pool.query(
            `
            SELECT *
            FROM Campaign
            WHERE createdBy = ?
            `,
            [fundraiserID]
        );

        return rows.map(row => new Campaign(row));
    }

    static async create(campaign) 
    {
        const [result] = await pool.query(
            `
            INSERT INTO Campaign
            (title, category, description, targetAmount, deadline, createdBy)
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                campaign.title,
                campaign.category,
                campaign.description,
                campaign.targetAmount,
                campaign.deadline,
                campaign.createdBy
            ]
        );

        campaign.campaignId = result.insertId;

        return campaign;
    }

    getStatus() 
    {
        const today = new Date();
        const deadlineDate = new Date(this.deadline);

        if (today > deadlineDate) 
        {
            return "Close";
        }

        return "Open";
    }
}

export default Campaign