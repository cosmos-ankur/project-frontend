import {categoryConstants} from '../actions/constants';

const initState = {
    categories : [],
    loading : false,
    error:null
};

const buildNewCategories = (parentId,categories,category) =>{
    let myCategories = [];


    if(parentId==undefined){
        return [
            ...categories,
            {
                _id : category._id,
                name : category.name,
                slug : category.slug,
                children:[]
            }
        ];
    }

    for(let cat of categories){
        const newCategory  = {
            _id : category._id,
                   name : category.name,
                   slug : category.slug,
                   parentId:category.parentId,
                   children :[]
        };
       if(cat._id==parentId){
           myCategories.push({
               ...cat,
               children: cat.children.length > 0  ? [...cat.children,newCategory]:[newCategory] 
           })
           
       }else{
           myCategories.push({
               ...cat,
               children:cat.children  > 0 ?buildNewCategories(parentId,cat.children,category):[]
           });
       }
    }

    return myCategories;
}

export default(state = initState,action) =>{
    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories : action.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading : true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentId,state.categories,action.payload.category);
            console.log('updated categories',updatedCategories)
            state = {
                ...state,
                categories:updatedCategories,
                loading:false
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initState
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading:false
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading:false
            }
            break;
        case categoryConstants.DELETE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break
        case categoryConstants.DELETE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading:false
            }
            break
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }

    }
    return state;
}