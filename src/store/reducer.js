import * as actionName from './action';

const initlaseState = {
    resipes: [],
    categories: [],
    user: {},
    shoppingList: []
}
const Rudecer = (state = initlaseState, action) => {
    switch (action.type) {
        case actionName.GET_RECIPES: {
            const recipies = action.data;
            state.resipes = recipies;
            return {
                ...state,
                recipies
            }
        }
        case actionName.SET_USER: {
            const data = action.data;
            state.user = data;
            return { ...state, data }
        }
        case actionName.DELETE_RECIPE: {
            console.log(action.payload)
            const recipeId = action.payload;
            const recipies = state.resipes.filter(recipe => recipe.Id !== recipeId)
            state.resipes = recipies;
            return {
                ...state,
                recipies
            };
        }
        case actionName.GET_CATEGORY: {
            const categories = action.data;
            state.categories = categories;
            return {
                ...state,
                categories
            }
        }
        // case actionName.GET_BUYLIST: {
        //     const buylist = action.data;
        //     state.buylist = buylist;
        //     return {
        //         ...state,
        //         buylist
        //     }
        // }
        case actionName.ADD_TO_CART: {
            const buylist = action.buylist;
            const newState = {
                ...state,
                buylist: [...state.buylist, buylist],
            };
            return newState;

        }
        case actionName.ADD_RECIPE: {
            const recipe = action.data;
            state.resipes.push(recipe);
            return {
                ...state,
                recipe
            }
        }
        case actionName.EDIT_RECIPE: {
            const recipe = action.data;
            const index = state.resipes.findIndex(x => x.Id == recipe.Id)
            state.resipes[index] = recipe;
            return {
                ...state,
                recipe
            }
        }


        case actionName.ADD_PRODUCT: {
            const product = [...state.shoppingList]
            product.push(action.data)
            return {
                ...state,
                product
            }
        }
        // case actionName.DELETE_PRODUCT: {
        //     const id = action.data;
        //     const filtered = state.buylist.filter(product => product.Id !== id);
        //     state.buylist = filtered;
        //     return {
        //         ...state,
        //         filtered
        //     }
        // }
        case 'DELETE_PRODUCT': {
            const productIdToDelete = action.data;
            const updatedShoppingList = state.buylist.filter(
                product => product.Id !== productIdToDelete
            );
            return {
                ...state,
                buylist: updatedShoppingList,
            };
        }
        
        
        case actionName.EDIT_COUNT: {
            const edit_count = action.data;
            const index = state.buylist.findIndex((s) => s.Id === edit_count.Id)
            state.buylist[index] = edit_count;
            return { ...state, edit_count }
        }

        case 'GET_SHOPPINGLIST': {
            const buylist = action.data;
            return { ...state, buylist: buylist };
          }
        
    }
}
export default Rudecer;