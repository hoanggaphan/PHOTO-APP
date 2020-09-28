import axiosClient from "./axiosClient";

const productApi = {
  getAll(params) {
    const url = "/products";
    return axiosClient({ url, method: "get", params });
  },
  get(id) {
    const url = `/products/${id}`;
    return axiosClient({ url, method: "get"});
  }
};

export default productApi;
