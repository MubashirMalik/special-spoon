import React, { useState } from "react"
import styled from "styled-components"
import { Title, Subtitle, FlexRow, InputGroup } from "../styles/Section.styled"
import { postJob } from "../../services/job.service";
import { useNavigate } from "react-router-dom";
import CountrySelect from "../CountrySelect";

// assets
import image from "../../images/undraw_post_job.svg"

const StyledPostJob = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 60px;
    max-width: 100%;
`

const SectionLeft = styled.div`
    display: flex;
    width: 50%;
    img {
        max-width: 90%; 
    }
`

const PostJob = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        mode: "Hybrid",
        engagement: "Full-time",
        type: "Permanent",
        city: "",
        country: "Afghanistan",
        description: "",
        // TODO: Connect Wallet
        posterAddress: "0x123"
    })

    const handleChange = (event) => {
        setFormData(
            prevFormData => ({
                ...prevFormData, [event.target.name]: event.target.value
            })
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postJob(formData)
        .then(res => {
            if (!res){
                console.log("Something went wrong")
            } else{
                navigate("/")
            }
        });
    }

    return(
        <StyledPostJob>
            <Title>Find a great hire, fast and reliable</Title>
            <div style={{display: "flex"}}>
                <SectionLeft>
                    <img src={image} alt="Post a Job" />
                </SectionLeft>
                <form style={{ width: "43%" }} onSubmit={handleSubmit}>
                    <FlexRow>
                        <InputGroup>
                            <label>Title<sup>*</sup></label>
                            <input 
                                name="title"
                                type="text"
                                placeholder="e.g., Senior Web Developer"
                                onChange={handleChange}
                                value={formData.title}
                                required
                            /> 
                        </InputGroup>
                    </FlexRow>
                    <FlexRow>
                        <InputGroup>
                            <label>Job Mode<sup>*</sup></label>
                            <select 
                                name="mode"
                                onChange={handleChange}
                                value={formData.mode}
                            >
                                <option value="Hybrid">Hybrid</option>
                                <option value="Remote">Remote</option>
                                <option value="Onsite">Onsite</option>        
                            </select>
                        </InputGroup>
                        <InputGroup>
                            <label>Job Engagement<sup>*</sup></label>
                            <select
                                name="engagement"
                                onChange={handleChange}
                                value={formData.engagement}
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>     
                            </select>
                        </InputGroup>
                        <InputGroup>
                            <label>Job Type<sup>*</sup></label>
                            <select
                                name="type"
                                onChange={handleChange}
                                value={formData.type}
                            >
                                <option value="Permanent">Permanent</option>
                                <option value="Temporary">Temporary</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>             
                            </select>
                        </InputGroup>
                    </FlexRow>
                    <Subtitle>Add job location to help us show it to most relevant people</Subtitle>
                    <FlexRow>
                        <InputGroup>
                            <label>City<sup>*</sup></label>
                            <input 
                                type="text"
                                name="city"
                                placeholder="e.g., Dubai"
                                onChange={handleChange}
                                required
                            /> 
                        </InputGroup>
                        <InputGroup>
                            <label>Country<sup>*</sup></label>
                            <CountrySelect 
                                handleChange={handleChange}
                                selectedCountry={formData.country}
                            /> 
                        </InputGroup>
                    </FlexRow>
                    <FlexRow>
                        <InputGroup>
                            <label>Description<sup>*</sup></label>
                            <textarea 
                                name="description"
                                rows="7" 
                                onChange={handleChange}
                                value={formData.description}
                                required
                            />
                        </InputGroup>
                    </FlexRow>
                    <FlexRow>
                        <button>Post</button>
                    </FlexRow>
                </form>
            </div>
        </StyledPostJob>
    )
}

export default PostJob