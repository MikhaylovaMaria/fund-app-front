import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const bankAccountEndpoint = "bankAccount/";

const BankAccountService = {
    create: async (payload) => {
        const userId = localStorageService.getUserId();
        const { data } = await httpService.post(bankAccountEndpoint, {
            ...payload,
            userId: userId
        });
        return data;
    },
    getAccounts: async () => {
        const userId = localStorageService.getUserId();
        const { data } = await httpService.get(bankAccountEndpoint, {
            params: {
                equalTo: userId
            }
        });
        return data;
    },
    removeAccount: async (accountId) => {
        const { data } = await httpService.delete(
            bankAccountEndpoint + accountId
        );
        return data;
    },
    updateAccount: async (payload) => {
        const { _id } = payload;
        const { data } = await httpService.patch(
            bankAccountEndpoint + _id,
            payload
        );
        return data;
    }
};

export default BankAccountService;
