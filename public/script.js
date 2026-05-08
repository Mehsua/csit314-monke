const campaigns = [
    {
        title: "Nepal earthquake relief fund",
        status: "In progress, closing on 10/6/2026",
        amount: "$115,124.12 raised",
        isClosed: false
    },
    {
        title: "Send Mary to art school",
        status: "In progress, closing on 5/5/2026",
        amount: "$100,120.19 raised",
        isClosed: false
    },
    {
        title: "Fund John's cancer treatment",
        status: "Closed on 12/11/2025",
        amount: "$85,123.45 raised",
        isClosed: true
    },
    {
        title: "Feed the hungry children",
        status: "Closed on 10/10/2025",
        amount: "$14,014.19 raised",
        isClosed: true
    }
]

const campaignList = document.getElementById("campaign-list")

function renderCampaigns() {

    campaignList.innerHTML = ""

    campaigns.forEach(campaign => {

        const div = document.createElement("div")
        div.classList.add("card")

        div.innerHTML = `
            <div class="left-section">
                <h2 class="campaign-title">${campaign.title}</h2>
                <p class="campaign-status">${campaign.status}</p>

                <button class="btn ${
                    campaign.isClosed ? "btn-closed" : "btn-edit"
                }">
                    ${campaign.isClosed ? "Closed" : "Edit Campaign"}
                </button>
            </div>

            <div class="middle-section">
                <div class="line"></div>
            </div>

            <div class="right-section">
                <p class="amount">${campaign.amount}</p>

                <button class="btn btn-donors">
                    View Donors
                </button>
            </div>
        `

        campaignList.appendChild(div)
    })
}

if (campaignList) {
    renderCampaigns()
}

const donations = [
    {
        title: "Nepal earthquake relief fund",
        status: "In progress, closing on 10/6/2026",
        amount: "$10",
        isClosed: false
    },
    {
        title: "Send Mary to art school",
        status: "In progress, closing on 5/5/2026",
        amount: "$5",
        isClosed: false
    },
    {
        title: "Fund John's cancer treatment",
        status: "Closed on 12/11/2025",
        amount: "$200",
        isClosed: true
    },
    {
        title: "Feed the hungry children",
        status: "Closed on 10/10/2025",
        amount: "$10",
        isClosed: true
    }
]

const donationList = document.getElementById("donation-list")

function renderDonations() {
    donationList.innerHTML = ""

    donations.forEach(donation => {
        const div = document.createElement("div")
        div.className = "card"

        div.innerHTML = `
            <div class="left-section">
                <h2 class="campaign-title">${donation.title}</h2>
                <p class="campaign-status">${donation.status}</p>

                <button class="btn ${donation.isClosed ? "btn-closed" : "btn-progress"}">
                    ${donation.isClosed ? "Closed" : "View progress"}
                </button>
            </div>

            <div class="middle-section">
                <div class="line"></div>
            </div>

            <div class="right-section">
                <p class="amount">${donation.amount}</p>
            </div>
        `

        donationList.appendChild(div)
    })
}

if (donationList) {
    renderDonations()
}