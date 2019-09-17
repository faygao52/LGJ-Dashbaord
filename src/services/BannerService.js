import { ApiRequest } from 'helpers/APIRequest';

const listAll = (page = 1, size = 10, orderBy = '') => 
    ApiRequest.request(
        `${process.env.REACT_APP_API_URL}/api/v1/banners?page=${page}&size=${size}&orderBy=${orderBy}`
    )



const getByID = (id) => 
    ApiRequest.request(
        `${process.env.REACT_APP_API_URL}/api/v1/banners/${id}`
    )

const updateById = (id, banner) => 
    ApiRequest.request(
        `${process.env.REACT_APP_API_URL}/api/v1/banners/${id}`,
        banner,
        'PUT'
    )
const deleteById = (id) =>
    ApiRequest.request(
        `${process.env.REACT_APP_API_URL}/api/v1/banners/${id}`,
        null,
        'DELETE'
    )

const create = (banner) => 
    ApiRequest.request(
        `${process.env.REACT_APP_API_URL}/api/v1/banners/`,
        banner,
        'POST'
    )

export const BannerService = {
    listAll,
    getByID,
    updateById,
    deleteById,
    create
}