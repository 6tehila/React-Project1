import { Fragment } from "react";
import { useLocation, Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import AddCaterory from "./addCategory";
import ShoppingList from "./shoppingList";
import { Button } from '@mui/material';

const Header = () => {
    const user = useSelector(state => state?.user)
    // return <Fragment>

    //     {!user ? <Fragment>
    //         <Link to="/login">כניסה</Link>
    //         <Link to="/signUp" state={{}}>הרשמה</Link> </Fragment>
    //         :
    //         <Fragment>

    //             <Link to="/getAllRecipies"> כל המתכונים</Link>
    //             <Link to="/addRecipe"> הוסף מתכון</Link>
    //             <Link to="/getCategory">  קטגוריות</Link>
                
    //             <Link to="/addCategory">  הוספת קטגוריה </Link>
    //             <Link to="/shoppingList">   הצגת רשימת קניות </Link>


    //         </Fragment>
    //     }
    return (
        <Fragment>
            {!user ? (
                <Fragment>
                    <Button component={Link} to="/login" variant="outlined" color="primary">
                        כניסה
                    </Button>
                    <Button component={Link} to="/signUp" variant="outlined" color="primary">
                        הרשמה
                    </Button>
                </Fragment>
            ) : (
                <Fragment>
                    <Button component={Link} to="/getAllRecipies" variant="outlined" color="primary">
                        כל המתכונים
                    </Button>
                    <Button component={Link} to="/addRecipe" variant="outlined" color="primary">
                        הוסף מתכון
                    </Button>
                    <Button component={Link} to="/getCategory" variant="outlined" color="primary">
                        קטגוריות
                    </Button>
                    <Button component={Link} to="/addCategory" variant="outlined" color="primary">
                        הוספת קטגוריה
                    </Button>
                    <Button component={Link} to="/shoppingList" variant="outlined" color="primary">
                        הצגת רשימת קניות
                    </Button>
                </Fragment>
            )}
        </Fragment>
    );
    // </Fragment>
}
export default Header;