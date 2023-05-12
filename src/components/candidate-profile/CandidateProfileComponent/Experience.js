import {
    Button,
    createStyles,
    Group,
    Select,
    Switch,
    Grid,
    Text,
    Divider,
    Card,
    Alert,
    Box,
    Textarea,
    TextInput,
    Badge
} from '@mantine/core'
import {useForm} from '@mantine/form';
import {showNotification} from '@mantine/notifications';
import axios from 'axios';
import React, {useContext, useEffect} from 'react'
import {AuthenticationContext} from '../../../context/authenticationContext';
import {ResumeContext} from '../../../context/resumeContext';
import {addWorkExperience} from '../../../Web3Client';
import {ContractCompaniesContext} from "../../../context/contractCompaniesContext";
import {monthsList} from "../../../services/helper/helper";

const useStyles = createStyles((theme) => ({
    button: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        width: "100%"
    },
    colorButton: {
        backgroundColor: "#1cc7d0",
        '&:hover': {
            backgroundColor: "#1cc7d0",
            color: "white"

        }
    },
    colorOutlineButton: {
        borderColor: "#1cc7d0",
        backgroundColor: "white",
        color: "#1cc7d0",
        border: "1px solid",
        '&:hover': {
            backgroundColor: "#1cc7d0",
            color: "white"

        }
    },
    menuControl: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        border: 0,
        borderLeft: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
        }`,
    },


}));

function Experience() {
    const {classes, theme} = useStyles();
    const {providerStatus} = useContext(AuthenticationContext)
    const context = useContext(ResumeContext)
    const {companiesList} = useContext(ContractCompaniesContext)
    console.log(companiesList)
    const form = useForm({
        initialValues: {
            institution: null,
            designation: null,
            from_month: null,
            from_year: null,
            to_month: null,
            to_year: null,
            country: null,
            city: null,
            responsibilities: null,
            currently_working: false,
        },

        validate: {
            institution: (value) => (value ? companiesList.some(item => item.hasOwnProperty('value') && item["value"] === value) ? null : "Institution is not registered" : "Institution must not be empty"),
            designation: (value) => (value ? null : "Designation  must not be empty"),
            from_month: (value) => (value ? null : "From Month  must not be empty"),
            from_year: (value) => (value ? null : "From Year  must not be empty"),
            country: (value) => (value ? null : "Country  must not be empty"),
            city: (value) => (value ? null : "City  must not be empty"),
            responsibilities: (value) => (value ? null : "Responcibilities  must not be empty"),
        },
    });
    useEffect(() => {

        form.setValues({
            designation: context.resumeData?.experience ? context.resumeData?.experience : form.values.designation,
            institution: context.resumeData?.company_names ? context.resumeData?.company_names : form.values.institution

        })


    }, [context.resumeData])
    useEffect(() => {
        if (form.values.currently_working === true) {
            form.setValues((prev) => {

                return {
                    ...prev,
                    to_month: null,
                    to_year: null,

                }


            })
        }


    }, [form.values.currently_working])

    const handleSubmit = (payload) => {
        const data = {...payload, walletAddress: providerStatus.connectedAccount}
        console.log(payload)
        const contractData = {
            issuingOrganization: payload.institution,
            designation: payload.designation,
            fromMonth: parseInt(payload.from_month),
            fromYear: parseInt(payload.from_year),
            toMonth: parseInt(payload.to_month),
            toYear: parseInt(payload.to_year),
            isCurrentJob: payload.currently_working

        }


        console.log(contractData)
        addWorkExperience(providerStatus.connectedAccount, contractData).then(res => {
            console.log(res)
            if(res){
                console.log(data)
                axios.post('http://localhost:3001/user/create-user-experience', data)
                    .then(response => {

                        if (response.status === 200) {
                            console.log('User Experience Added !');
                            console.log('Response:', response.data);
                            showNotification({
                                title: 'User Experience',
                                message: "User Experience Added Successfully",
                            })

                        } else {
                            console.error('Failed to add user Experience:', response.statusText);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        showNotification({
                            title: 'User Experience not Added Successfully',
                            message: JSON.stringify(error.response.data),
                        })
                        console.error('Error creating user:', error);
                    });
            }

        })
    }
    console.log(form.values)
    return (
        <Grid>
            <Grid.Col span={6}>
                <form
                    style={{width: "100%"}}
                    onSubmit={form.onSubmit((values, event) => {
                            if(form.values.to_month && form.values.to_year) {
                                console.log("asd")
                                // Convert month name to month number
                                const monthNum1 = new Date(`${form.values.from_month} 1, ${form.values.from_year}`).getMonth() + 1;
                                const monthNum2 = new Date(`${form.values.to_month} 1, ${form.values.to_year}`).getMonth() + 1;

// Convert year string to integer
                                const year1 = parseInt(form.values.from_year);
                                const year2 = parseInt(form.values.to_year);

// Create date objects for the two dates
                                const date1 = new Date(`${year1}-${monthNum1}-01`);
                                const date2 = new Date(`${year2}-${monthNum2}-01`);
                                if (date1 > date2) {
                                    form.setFieldError('from_month', 'Must Be less than To Month');
                                    form.setFieldError('from_year', 'Must Be less than To Year');
                                } else if (date2 > date1) {
                                    handleSubmit(values)
                                } else {
                                    handleSubmit(values)
                                }

                            }else{
                                handleSubmit(values)
                            }


                    })}
                >
                    <TextInput
                        m="sm"
                        label="Compnay/Organization(Name - Address)"
                        placeholder="Compnay/Organization(Name - Address)"
                        withAsterisk
                        {...form.getInputProps(`institution`)}

                    />
                    <TextInput
                        m="sm"
                        label="Designation/Job Title"
                        placeholder="Designation/Title"
                        withAsterisk
                        {...form.getInputProps(`designation`)}

                    />
                    <Group>
                        <Select
                            m="sm"
                            label="From Month"
                            placeholder=" From Month"
                            withAsterisk
                            data={monthsList}
                            {...form.getInputProps(`from_month`)}
                        />
                        <TextInput
                            m="sm"
                            label="From Year"
                            placeholder="From Year"
                            withAsterisk

                            {...form.getInputProps(`from_year`)}
                        />
                    </Group>
                    {
                        (form.values.currently_working) ? "" : (<Group>
                            <Select
                                m="sm"
                                label="To Month"
                                placeholder=" To Month"
                                withAsterisk
                                data={monthsList}
                                {...form.getInputProps(`to_month`)}
                            />
                            <TextInput
                                m="sm"
                                label="To Year"
                                placeholder="To Year"
                                withAsterisk
                                {...form.getInputProps(`to_year`)}
                            />
                        </Group>)
                    }


                    <TextInput
                        m="sm"
                        label="Country"
                        placeholder="Country"
                        withAsterisk

                        {...form.getInputProps(`country`)}
                    />
                    <TextInput
                        m="sm"
                        label="City"
                        placeholder="City"
                        withAsterisk
                        {...form.getInputProps(`city`)}
                    />
                    <Textarea
                        m="sm"
                        label="Responcibilites"
                        placeholder="Responcibilites"
                        withAsterisk
                        {...form.getInputProps(`responsibilities`)}


                    />
                    <Switch
                        m="md"
                        label="Currently Working"
                        onLabel="YES"
                        offLabel="NO"
                        size="sm"
                        {...form.getInputProps(`currently_working`)}
                    />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "right",
                            gap: "10px",
                            marginTop: "10px",
                        }}
                    >
                        <Button className={classes.colorButton} mt="sm" type="submit">
                            Save
                        </Button>

                    </div>


                </form>
            </Grid.Col>
            <Grid.Col span={6}>
                <Card
                    withBorder
                    shadow="sm"
                    radius="md"
                >
                    <Text mt="md" weight={600} size={19}>
                        Experience{" "}
                    </Text>
                    <Divider/>
                    <div style={{width: "100%"}}>
                        <Alert

                            m={10}
                            title={`${form.values.designation ? form.values.designation : ""}`}>
                            <Box>
                                <Text tt="uppercase">Institution : {form.values.institution}</Text>
                                <Group><Text>From Month :{form.values.from_month}</Text><Text>From Year
                                    : {form.values.from_year}</Text> </Group>
                                <Group><Text>To Month : {form.values.to_month}</Text> <Text>To Year
                                    :{form.values.to_year}</Text></Group>
                                <Group><Text>City : {form.values.city}</Text> <Text>Country{form.values.country}</Text></Group>
                                {form.values.currently_working ? <Badge size="lg" radius="xl" color="teal">
                                    Currently Working
                                </Badge> : <Badge size="lg" radius="xl" color="red">
                                    Not Working Currently
                                </Badge>}


                            </Box>

                        </Alert>

                    </div>
                </Card>
            </Grid.Col>
        </Grid>
    )
}

export default Experience
