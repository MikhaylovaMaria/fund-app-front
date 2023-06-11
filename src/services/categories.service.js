import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const categoriesEndpoint = "category/";

const CategoriesService = {
    create: async (payload) => {
        const userId = localStorageService.getUserId();
        const { data } = await httpService.post(categoriesEndpoint, {
            ...payload,
            userId: userId
        });
        return data;
    },
    getCategories: async () => {
        const { data } = await httpService.get(
            categoriesEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    removeCategories: async (catId) => {
        const { data } = await httpService.delete(categoriesEndpoint + catId);
        return data;
    },
    updateCategories: async (payload) => {
        const { _id } = payload;
        const { data } = await httpService.patch(
            categoriesEndpoint + _id,
            payload
        );
        return data;
    }
};

export default CategoriesService;
