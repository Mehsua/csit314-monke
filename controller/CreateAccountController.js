import SystemUser from "../entity/SystemUser.js";
import Admin from "../entity/Admin.js";
import Fundraiser from "../entity/Fundraiser.js";
import Donee from "../entity/Donee.js";

class CreateAccountController 
{
    static async createAccount(req, res) 
    {
        try 
        {
            const { fullName, email, password, role } = req.body;

            if (!fullName || !email || !password || !role) 
            {
                return res.status(400).json(
                    {
                        message: "Please fill in all required fields"
                    }
                );
            }

            const existingUser = await SystemUser.findByEmail(email);

            if (existingUser) 
            {
                return res.status(409).json(
                    {
                        message: "Email already exists"
                    }
                );
            }

            let createdUser;

            if (role === "admin") 
            {
                const admin = new Admin({ fullName, email, password });
                createdUser = await Admin.create(admin);
            } 

            else if (role === "fundraiser") 
            {
                const fundraiser = new Fundraiser({ fullName, email, password });
                createdUser = await Fundraiser.create(fundraiser);
            } 

            else if (role === "donee") 
            {
                const donee = new Donee({ fullName, email, password });
                createdUser = await Donee.create(donee);
            } 
            
            else 
            {
                return res.status(400).json(
                    {
                        message: "Invalid role selected"
                    }
                );
            }

            

            

            return res.status(201).json(
                {
                    message: "Fundraiser account created successfully",
                    userId: createdUser.userId,
                    fullName: createdUser.fullName,
                    email: createdUser.email,
                    role
                }
            );
            
      
        } 
        catch (error) 
        {
            console.error(error);

            res.status(500).json(
                {
                    message: "Failed to create account"
                }
            );
        }
    }
}

export default CreateAccountController;