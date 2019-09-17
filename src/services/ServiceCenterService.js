import { ApiRequest } from 'helpers/APIRequest';

const listAll = (page = 1, size = 10, orderBy = '', q = '') => 
    ApiRequest.request(
        `${process.env.REACT_APP_API_URL}/api/v1/service-centers?page=${page}&size=${size}&orderBy=${orderBy}&q=${q}`
    )

const getByID = (id) => 
    ApiRequest.request(
        `${process.env.REACT_APP_API_URL}/api/v1/service-centers/${id}`
    )

const updateById = (id, serviceCenter) => 
    ApiRequest.request(
        `${process.env.REACT_APP_API_URL}/api/v1/service-centers/${id}`,
        serviceCenter,
        'PUT'
    )

const deleteById = (id) =>
    ApiRequest.request(
        `${process.env.REACT_APP_API_URL}/api/v1/service-centers/${id}`,
        null,
        'DELETE'
    )

const create = (serviceCenter) => 
    ApiRequest.request(
        `${process.env.REACT_APP_API_URL}/api/v1/service-centers/`,
        serviceCenter,
        'POST'
    )
    
export const ServiceCenterService = {
    listAll,
    getByID,
    updateById,
    deleteById,
    create
}