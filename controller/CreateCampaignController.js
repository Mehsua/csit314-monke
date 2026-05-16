import Campaign from "../entity/Campaign.js";

class CreateCampaignController 
{
    static async createCampaign(req, res) 
    {
        try 
        {
            const fundraiserId = req.params.fundraiserId;

            const {title, category, description, targetAmount, deadline} = req.body;

            if (!title || !category || !targetAmount || !deadline) 
            {
                return res.status(400).json(
                    {
                        message: "Please fill in all required fields"
                    }
                );
            }

            const campaign = new Campaign(
                {
                    title,
                    category,
                    description,
                    targetAmount,
                    deadline,
                    createdBy: fundraiserId
                }
            );

            const createdCampaign = await Campaign.create(campaign);

            return res.status(201).json(
                {
                    message: "Campaign created successfully",
                    campaignId: createdCampaign.campaignId,
                    title: createdCampaign.title,
                    category: createdCampaign.category,
                    targetAmount: createdCampaign.targetAmount,
                    deadline: createdCampaign.deadline,
                    status: createdCampaign.getStatus(),
                    createdBy: createdCampaign.createdBy
                }
            );

        } 
        catch (error) 
        {
            console.error(error);

            return res.status(500).json(
                {
                    message: "Failed to create campaign"
                }
            );
        }
    }
}

export default CreateCampaignController;