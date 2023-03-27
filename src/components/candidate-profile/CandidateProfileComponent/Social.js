import { Button, createStyles, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import React from 'react'
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
function Social() {
    const { classes, theme } = useStyles();
    const form = useForm({
        initialValues: {
            bio: null,
            wallet_address: null,
            linked_in: null,
            github: null,
            website_portfolio: null,
        },

        validate: {
            bio: (value) => (value ? null : "Bio must not be empty"),




        },
    });
    return (
        <form
            style={{ width: "100%" }}
            onSubmit={form.onSubmit((values, event) => {
                console.log(values);

            })}
        >

            <TextInput
                m="sm"
                label="Linked In"
                placeholder="Linked In"
                {...form.getInputProps("linked_in")}
            />
            <TextInput
                m="sm"
                label="Github"
                placeholder="Github"
                {...form.getInputProps("github")}
            />
            <TextInput
                m="sm"
                label="Your Website/Portfolio"
                placeholder="Your Website/Portfolio"
                {...form.getInputProps("website_portfolio")}
            />
            <TextInput
                m="sm"
                label="Your Address"
                placeholder="Your Address"
                disabled={true}
                {...form.getInputProps("wallet_address")}
            />
            <Textarea
                m="sm"
                label="Bio"
                placeholder="Bio"
                withAsterisk
                {...form.getInputProps("bio")}
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
    )
}

export default Social