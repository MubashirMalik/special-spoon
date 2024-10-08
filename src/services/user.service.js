const BASE_URL = "http://localhost:3001/user/"

export const registerUserToDatabase = async (walletAddress) => {
    try {
        const url = BASE_URL + "register"
        const response = await fetch(url, { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletAddress })
        });
        return await response.json();
    } catch (err) {
        console.log("Exception in registerUser():", err);
    }
}

export const getUserDetails = async (walletAddress) => {
    try {
        const url = BASE_URL + `get-user-details?walletAddress=${walletAddress}`
        const response = await fetch(url);
        return await response.json();
    } catch (err) {
        console.log("Exception in getUserDetails():", err);
    }
}

export const updateUserDetails = async (user) => {
    try {
        const url = BASE_URL + "update-user-details"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user })
        });
        return await response.json();
    } catch (err) {
        console.log("Exception in updateUserDetails():", err);
    }
}