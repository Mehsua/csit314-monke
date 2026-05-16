class CreateAccountPage 
{
    constructor() 
    {
        this.form = document.getElementById("create-account-form")
        this.messageElement = document.getElementById("message")

        this.form.addEventListener(
            "submit", 
            (event) => 
            {
                event.preventDefault()
                this.createAccount()
            }
        )
    }

    getFormData() 
    {
        return {
            fullName: document.getElementById("fullName").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            role: document.getElementById("role").value
        }
    }

    async createAccount() 
    {
        const formData = this.getFormData()

        try 
        {
            const response = await fetch(
                "/api/register", 
                {
                    method: "POST",
                    headers: 
                    {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            )

            const result = await response.json();
            console.log(response)

            if (!response.ok) 
            {
                alert(result.message);
                return;
            }

            // store user data temporarily
            sessionStorage.setItem(
                "currentUser",
                JSON.stringify(result)
            );

            // redirect
            window.location.href = "/";

            // this.messageElement.textContent = result.message;
        } 
        catch (error) 
        {
            console.error(error);
            // this.messageElement.textContent = "Error creating account";
            alert("Error creating account");
        }
    }
}

new CreateAccountPage();