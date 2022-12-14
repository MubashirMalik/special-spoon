const BASE_URL = "http://localhost:3001/job/"

export const getJobs = async () => {
    try {
        const url = BASE_URL + "get-jobs"
        const response = await fetch(url);
        return await response.json();
    } catch (err) {
        console.log("Exception in getJobs():", err);
    }
}

export const postJob = async (job) => {
    try {
        const url = BASE_URL + "post-job"
        const response = await fetch(url, { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({job})
        });
        return await response.json();
    } catch (err) {
        console.log("Exception in postJob():", err);
    }
}

export const getJob = async (jobId) => {
    try {
        const url = BASE_URL + "get-job?jobId=" + jobId
        const response = await fetch(url);
        return await response.json();
    } catch (err) {
        console.log("Exception in getJob():", err);
    }
}

export const updateJob = async (job) => {
    try {
        const url = BASE_URL + "update-job"
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({job})
        });
        return await response.json();
    } catch (err) {
        console.log("Exception in updateJob():", err);
    }
}