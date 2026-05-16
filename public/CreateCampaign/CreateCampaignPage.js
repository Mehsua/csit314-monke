class CreateCampaignPage 
{
    constructor() 
    {
        this.form = document.getElementById("create-campaign-form");
        this.messageElement = document.getElementById("message");

        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.createCampaign();
        });
    }

    getFormData() 
    {
        

        return {
            title: document.getElementById("title").value,
            category: document.getElementById("category").value,
            description: document.getElementById("description").value,
            targetAmount: document.getElementById("targetAmount").value,
            deadline: document.getElementById("deadline").value
        };
    }

    async createCampaign() 
    {
        const currentUser = JSON.parse(
            sessionStorage.getItem("currentUser")
        );

        const fundraiserId = currentUser.userId

        const formData = this.getFormData();

        try 
        {
            const response = await fetch(
                `/api/fundraiser/${fundraiserId}/createCampaign`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const result = await response.json();

            if (!response.ok) 
            {
                this.messageElement.textContent = result.message;
                return;
            }

            this.messageElement.textContent = result.message;

            window.location.href = `/fundraiser/${fundraiserId}/campaignHistory`;

        } 
        catch (error) 
        {
            console.error(error);
            this.messageElement.textContent = "Error creating campaign";
        }
    }
}

new CreateCampaignPage();