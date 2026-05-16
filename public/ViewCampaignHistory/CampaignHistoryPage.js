class CampaignHistoryPage 
{
    constructor() 
    {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        this.campaignListElement = document.getElementById("campaign-list");
    }

    getFundraiserId() {
        return this.currentUser.userId;
    }

    async loadCampaignSummary() 
    {
        try 
        {
            if (!this.currentUser) {
                this.showErrorMessage();
                return;
            }
            
            if (this.currentUser.role !== "fundraiser") {
                this.campaignListElement.innerHTML =
                    "<p>Only fundraisers can view campaign history.</p>";
                return;
            }

            const fundraiserId = this.getFundraiserId();

            const response = await fetch(`/api/fundraisers/${fundraiserId}/campaignHistory`);
            const campaigns = await response.json();
            this.displayCampaignSummaries(campaigns);
        } 
        catch (error) 
        {
            console.error(error);
            this.showErrorMessage();
        }
    }

    displayCampaignSummaries(campaigns) 
    {
        this.campaignListElement.innerHTML = "";

        if (campaigns.length === 0) 
        {
            this.showNoCampaignMessage();
            return;
        }

        campaigns.forEach(
            campaign => 
                {
                    const card = document.createElement("div")
                    card.classList.add("card")
                    card.innerHTML = `
                    <div class="left-section">
                        <h2 class="campaign-title">${campaign.title}</h2>

                        <p class="campaign-status">
                            ${campaign.status === "Closed" 
                            ? `Closed on ${formatDate(campaign.deadline)}`
                            : `In progress, closing on ${formatDate(campaign.deadline)}`
                            }
                        </p>

                        <button class="btn ${campaign.status === "Closed" ? "btn-closed" : "btn-edit"}">
                            ${campaign.status === "Closed" ? "Closed" : "Edit Campaign"}
                        </button>
                    </div>

                    <div class="middle-section">
                        <div class="line"></div>
                    </div>

                    <div class="right-section">
                        <p class="amount">$${Number(campaign.targetAmount).toLocaleString()} target</p>

                        <button class="btn btn-donors">
                            View Donors
                        </button>
                    </div>
                    `

                    this.campaignListElement.appendChild(card)
            }
        )
    }

    showNoCampaignMessage() 
    {
        this.campaignListElement.innerHTML = "<p>No campaigns found.</p>";
    }

    showErrorMessage() 
    {
        this.campaignListElement.innerHTML = "<p>Error loading campaign summary.</p>";
    }

    
}



function formatDate(dateString) 
{
    const date = new Date(dateString)

    return date.toLocaleDateString("en-SG", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    })
}

const page = new CampaignHistoryPage();
page.loadCampaignSummary();