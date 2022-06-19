import { Icon } from '@iconify/react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';




const categories = [
    {
        name: "Mobiles", icon: "entypo:mobile"
    },
    {
        name: "Laptops", icon: "ic:round-laptop"
    },
    {
        name: "Tvs", icon: "ic:baseline-tv"
    },
]

export const CategoriesList = () => (
    <List
        sx={{
            overflow: 'auto',
            maxHeight: "90%",
            '& ul': { padding: 0 },
        }}
        subheader={<li />}
    >

        <li key={`section-categories`}>
            <ul>
                <ListSubheader>{`CATEGORIES`}</ListSubheader>
                {categories.map((category) => (
                    <ListItem key={`item-category-${category.name}`}>
                        <ListItemIcon sx={{minWidth: 48, pl: 2.5}}>
                            <Icon icon={`${category.icon}`} />
                        </ListItemIcon>
                        <ListItemText primary={`${category.name}`} />
                    </ListItem>
                ))}
            </ul>
        </li>
    </List>)