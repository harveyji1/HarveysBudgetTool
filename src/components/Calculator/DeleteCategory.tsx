import './DeleteCategory.css';
import { TiDelete } from "react-icons/ti";

export interface DeleteCategoryProp {
    categoryId: number;
};

function DeleteCategory(){
    return (
        <TiDelete />
    )
};

export default DeleteCategory;