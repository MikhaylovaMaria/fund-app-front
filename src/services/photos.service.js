import httpService from "./http.service";

const photosEndpoint = "upload/";

const photosService = {
    create: async (payload) => {
        const { data } = await httpService.post(photosEndpoint, payload);
        return data;
    }

    // get: async (payload) => {
    //   const { data } = await httpService.get(photosEndpoint, payload);
    //   return data;
    // },
};

export default photosService;
