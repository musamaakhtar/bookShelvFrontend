/** Controller */
import Users from '../model/user'
// get : http://localhost:3000/api/users
export async function postUser(req, res) {
    try {
        const profilePic = req.body.profilePic;
        const { name, Father, CNIC, email, Batch, Roll_Number, Slot, gender, describe } = req.body;
        const register = new Users({profilePic, name, Father, CNIC, email, Batch, Roll_Number, Slot, gender, describe });
        console.log(register, "this one sending data");
        register.save();
        res.status(200).json({ message: "user registered", data: req.body });
    } catch (error) {
        return res.status(404).json({ message: "Here is error", error: error })
    }
}
export async function getUsers(req, res) {
    try {
        const users = await Users.find({})

        if (!users) return res.status(404).json({ error: "Data not Found" })
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ error: "Error While Fetching Data" })
    }
}
// get : http://localhost:3000/api/users/1
export async function getUser(req, res) {
    try {
        const { self } = req.query;
        console.log(self, "this one is query")
        if (self) {
            const user = await Users.findById(self);
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(404).json({ error: "Cannot get the User...!" })
    }
    try {
        console.log(req.body, "body is here");
        const id = req.body.id;
        registeringUser.findOne({ _id: id }, (err, data) => {
            if (data) {
                res.json({ message: "User Exist", data: data })
            }
            else {
                res.json({ message: "User not  Exist", data: data })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
// post : http://localhost:3000/api/users

// put : http://localhost:3000/api/users/1
export async function putUser(req, res) {
    try {
        const { userId } = req.query;
        const { name, Father, CNIC, email, Batch, Roll_Number, Slot, gender, describe } = req.body;
        console.log(req.body)
        const formData = {
            "name": name,
            "Father": Father,
            "CNIC": CNIC,
            "email": email,
            "Batch": Batch,
            "Roll_Number": Roll_Number,
            "Slot": Slot,
            "gender": gender,
            "describe": describe
        }

        if (userId && formData) {
            console.log(formData, "Form Data");
            const user = await Users.findByIdAndUpdate(userId, formData);
            res.status(200).json(user)
        }
        res.status(404).json({ error: "User Not Selected...!" })
    } catch (error) {
        res.status(404).json({ error: "Error While Updating the Data...!" })
    }
}
// delete : http://localhost:3000/api/users/1
export async function deleteUser(req, res) {
    try {
        const { self } = req.query;

        if (self) {
            const user = await Users.findByIdAndDelete(self)
            return res.status(200).json(user)
        }

        res.status(404).json({ error: "User Not Selected...!" })

    } catch (error) {
        res.status(404).json({ error: "Error While Deleting the User...!" })
    }
}