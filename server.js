import express from "express";
import dotenv from "dotenv";
import ViewCampaignHistoryController from "./controller/ViewCampaignHistoryController.js";
import CreateAccountController from "./controller/CreateAccountController.js";
import CreateCampaignController from "./controller/CreateCampaignController.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get(
    "/fundraiser/:fundraiserID/campaignHistory", 
    (req, res) => 
    {
        res.sendFile(
            "ViewCampaignHistory/campaign-history.html", 
            { 
                root: "public" 
            }
        );
    }
);

app.get(
    "/api/fundraisers/:fundraiserId/campaignHistory",
    ViewCampaignHistoryController.getCampaignHistory
);

app.get(
    "/", 
    (req, res) => 
    {
        res.sendFile(
            "Home/index.html", 
            {
                root: "public"
            }
        )
    }
)

app.get(
    "/register", 
    (req, res) => 
    {
        res.sendFile(
            "CreateAccount/create-account.html", 
            {
                root: "public"
            }
        )
    }
)

app.post(
    "/api/register",
    CreateAccountController.createAccount
)

app.get(
    "/createCampaign", 
    (req, res) => 
    {
        res.sendFile(
            "CreateCampaign/create-campaign.html", 
            {
                root: "public"
            }
        );
    }
);

app.post(
    "/api/fundraiser/:fundraiserId/createCampaign",
    CreateCampaignController.createCampaign
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});