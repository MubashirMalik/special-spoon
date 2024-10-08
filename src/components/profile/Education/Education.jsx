import {createStyles, Card, Title, Grid, Stack} from '@mantine/core';
import {EducationCard} from "./EducationCard/EducationCard.jsx";
import NoRecordAlert from "../NoRecordAlert";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        width:"100%",
    },
}));

export function Education({ degrees, setRefreshUserData }) {
    const {classes} = useStyles();
    
    const items = degrees.map((degree, index) => (
        <Grid.Col span={6} key={index}>
            <EducationCard 
                degree={degree} 
                id={index}   
                setRefreshUserData={setRefreshUserData}    
            />
        </Grid.Col>
    ));   

    return (
        <Card shadow={"md"} withBorder radius="md"  className={classes.card}>
            <Stack spacing={15} >
                <Title size={20}>
                    Education
                </Title>
                { degrees.length > 0 ?
                    <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={15}>{ items } </Grid> :
                    <NoRecordAlert
                        section="education"
                        message="Add education to stand out to employers."
                        href="/account/education"
                    />
                }
            </Stack>
        </Card>
    );
}


