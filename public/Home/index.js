const currentUser = JSON.parse(
    sessionStorage.getItem("currentUser")
);

if (currentUser) 
{
    document.getElementById("userId").textContent =
        currentUser.userId;

    document.getElementById("fullName").textContent =
        currentUser.fullName;

    document.getElementById("email").textContent =
        currentUser.email;

    document.getElementById("role").textContent = currentUser.role;

    if (currentUser.role === "fundraiser") 
    {
        const createCampaignLink = document.getElementById("createCampaignLink");

        createCampaignLink.style.display = "inline-block";
        createCampaignLink.href = "/createCampaign";
    }
}