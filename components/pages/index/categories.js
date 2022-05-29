import Box from "@mui/material/Box";
import { Category } from "components/pages/index/category";
import { categories } from "constants/categories";


export const Categories = () => {
    return (
        <Box
            sx={{ display: "flex", flexDirection: "column", gap: 6 }}
        >
            {categories.map(category => <Category category={category} />)}
        </Box>
    )
}