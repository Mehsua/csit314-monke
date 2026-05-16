import Campaign from "../entity/Campaign.js";
import Donation from "../entity/Donation.js";

class ViewCampaignHistoryController 
{
    static async getCampaignHistory(req, res) 
    {
        try 
        {
            const fundraiserId = req.params.fundraiserId;
            const campaigns = await Campaign.findByFundraiser(fundraiserId)
            const summaryList = []

            for (const campaign of campaigns) 
            {
                // const amountRaised = await Donation.calculateTotalByCampaign(fundraiserID)

                summaryList.push(
                    {
                        campaignId: campaign.campaignId,
                        title: campaign.title,
                        category: campaign.category,
                        description: campaign.description,
                        targetAmount: campaign.targetAmount,
                        deadline: campaign.deadline,
                        status: campaign.getStatus(),
                        // goalAmount: campaign.getGoalAmount(),
                        // amountRaised
                    }
                );
            }

            res.json(summaryList)
        } 
        catch (error) 
        {
            console.error(error)
            res.status(500).json(
                {
                    message: "Failed to retrieve campaign summary"
                }
            )
        }
    }
}

export default ViewCampaignHistoryController