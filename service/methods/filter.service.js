import Api from "../index";
import {ApiEndpoint, Method} from "../APIConstants";
import axios from "axios";


export const FilterService = {
    async getFilterData(Ojc) {
        try {
            const getFilterData = await Api("filter", Method.POST, null, Ojc)({});
            if (getFilterData !== undefined && getFilterData.status === 200) {
                console.log(getFilterData.data,"getDeviceDefinitionsData.data")
                // return getDevicesCateloryData.data;
            } else {
                return [];
            }
        } catch (e) {
            console.log(e.response, "No data to load error");
            return undefined;
        }
    },
}