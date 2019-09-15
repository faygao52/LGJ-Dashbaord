import { ApiRequest } from 'helpers/APIRequest';

const listAll = (page = 1, size = 10, orderBy = '', q = '') => 
    ApiRequest.request(
        `${process.env.REACT_APP_API_URL}/api/v1/service-centers?page=${page}&size=${size}&orderBy=${orderBy}&q=${q}`
    )

const getByID = (id) => 
    ApiRequest.request(
        `${process.env.REACT_APP_API_URL}/api/v1/service-centers/${id}`
    )

const updateById = (id, usercase) => 
    ApiRequest.request(
        `${process.env.REACT_APP_API_URL}/api/v1/service-centers/${id}`,
        usercase,
        'PUT'
    )
export const ServiceCenterService = {
    listAll,
    getByID,
    updateById
}