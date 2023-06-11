import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const OperationEndpoint = "operations/";

const OperationService = {
    create: async (payload) => {
        const userId = localStorageService.getUserId();
        const { data } = await httpService.post(OperationEndpoint, {
            ...payload,
            userId: userId
        });
        return data;
    },
    getOperations: async () => {
        const userId = localStorageService.getUserId();
        const { data } = await httpService.get(OperationEndpoint, {
            params: {
                equalTo: `${userId}`
            }
        });
        return data;
    },
    removeOperation: async (operationId) => {
        const { data } = await httpService.delete(
            OperationEndpoint + operationId
        );
        return data;
    },
    updateOperation: async (payload) => {
        const { _id } = payload;
        const { data } = await httpService.patch(
            OperationEndpoint + _id,
            payload
        );
        return data;
    }
};

export default OperationService;
