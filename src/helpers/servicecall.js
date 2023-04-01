import { BASE_URL } from "../constants/config";
import { MethodType, StatusCodes } from "../constants/defaultValues";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Token: sessionStorage.getItem("user_token") },
});
export const CallService = function (
  url,
  type,
  isUrlType,
  data,
  urlData,
  callback
) {
  switch (type) {
    case MethodType.GET:
      if (isUrlType) {
        axiosInstance({
          headers: { Token: sessionStorage.getItem("user_token") },
          method: MethodType.GET,
          url: url + urlData,
        })
          .then((res) => {
            if (handleResponse(res)) callback(res.data, data);
          })
          .catch(function (error) {
            // handle error
            callback(error);
          })
          .finally(function () {
            // always executed
          });
      } else {
        axiosInstance({
          headers: { Token: sessionStorage.getItem("user_token") },
          method: MethodType.GET,
          url: url,
        })
          .then((res) => {
            if (handleResponse(res)) callback(res.data, data);
          })
          .catch(function (error) {
            // handle error
            callback(error);
          })
          .finally(function () {
            // always executed
          });
      }
      break;
    case MethodType.POST:
      if (isUrlType) {
        axiosInstance({
          headers: { Token: sessionStorage.getItem("user_token") },

          method: MethodType.POST,
          url: url + urlData,
          data: data,
          config: {
            headers: {
              "Content-Type": "application/json",
            },
          },
        })
          .then((res) => {
            if (handleResponse(res)) callback(res.data, data);
          })
          .catch(function (error) {
            // handle error
            callback(error);
          })
          .finally(function () {
            // always executed
          });
      } else {
        axiosInstance({
          headers: { Token: sessionStorage.getItem("user_token") },

          method: MethodType.POST,
          url: url,
          data: data,
          config: {
            headers: {
              "Content-Type": "application/json",
            },
          },
        })
          .then((res) => {
            if (handleResponse(res)) callback(res.data, data);
          })
          .catch(function (error) {
            // handle error
            callback(error);
          })
          .finally(function () {
            // always executed
          });
      }
      break;
    case MethodType.PATCH:
      if (isUrlType) {
        axiosInstance({
          headers: { Token: sessionStorage.getItem("user_token") },

          method: MethodType.PATCH,
          url: url + urlData,
          data: data,
          config: {
            headers: {
              "Content-Type": "application/json",
            },
          },
        })
          .then((res) => {
            if (handleResponse(res)) callback(res.data, data);
          })
          .catch(function (error) {
            // handle error
            callback(error);
          })
          .finally(function () {
            // always executed
          });
      } else {
        axiosInstance({
          headers: { Token: sessionStorage.getItem("user_token") },

          method: MethodType.PATCH,
          url: url,
          data: data,
          config: {
            headers: {
              "Content-Type": "application/json",
            },
          },
        })
          .then((res) => {
            if (handleResponse(res)) callback(res.data, data);
          })
          .catch(function (error) {
            // handle error
            callback(error);
          })
          .finally(function () {
            // always executed
          });
      }
      break;
    case MethodType.PUT:
      if (isUrlType) {
        axiosInstance({
          headers: { Token: sessionStorage.getItem("user_token") },

          method: MethodType.PUT,
          url: url + urlData,
          data: data,
          config: {
            headers: {
              "Content-Type": "application/json",
            },
          },
        })
          .then((res) => {
            if (handleResponse(res)) callback(res.data, data);
          })
          .catch(function (error) {
            // handle error
            callback(error);
          })
          .finally(function () {
            // always executed
          });
      } else {
        axiosInstance({
          headers: { Token: sessionStorage.getItem("user_token") },

          method: MethodType.PUT,
          url: url,
          data: data,
          config: {
            headers: {
              "Content-Type": "application/json",
            },
          },
        })
          .then((res) => {
            if (handleResponse(res)) callback(res.data, data);
          })
          .catch(function (error) {
            // handle error
            callback(error);
          })
          .finally(function () {
            // always executed
          });
      }
      break;
    case MethodType.DELETE:
      if (isUrlType) {
        axiosInstance({
          headers: { Token: sessionStorage.getItem("user_token") },

          method: MethodType.DELETE,
          url: url + urlData,
          data: data,
        })
          .then((res) => {
            if (handleResponse(res)) callback(res.data, data);
          })
          .catch(function (error) {
            // handle error
            callback(error);
          })
          .finally(function () {
            // always executed
          });
      } else {
        axiosInstance({
          headers: { Token: sessionStorage.getItem("user_token") },

          method: MethodType.DELETE,
          url: url,
          data: data,
        })
          .then((res) => {
            if (handleResponse(res)) callback(res.data, data);
          })
          .catch(function (error) {
            // handle error
            callback(error);
          })
          .finally(function () {
            // always executed
          });
      }
      break;

    default:
      break;
  }
};

function handleResponse(res) {

  var response = false;
  if (res.data) {
    if (res.data.statusCode === StatusCodes.Duplicate) {
      toastr.error("", res.data.exception ? res.data.exception : res.data.stringResult ? res.data.stringResult : "Duplicate value! Please try some other"
      );

    } else if (res.data.statusCode === StatusCodes.InvalidData) {
      toastr.error("", res.data.exception ? res.data.exception : res.data.stringResult ? res.data.stringResult : "Please check your values! Something went wrong");
    }
    else if (res.data.statusCode === StatusCodes.Forbidden)
      toastr.error("", res.data.exception ? res.data.exception : res.data.stringResult ? res.data.stringResult : "Server rejected our request");
    else if (res.data.statusCode === StatusCodes.NotFound) {
      toastr.error(
        "",
        res.data.exception ? res.data.exception : res.data.stringResult ? res.data.stringResult : "Your request is not found"
      );
    }
    else if (res.data.statusCode === StatusCodes.Unauthorized) {
      if (res.config.url.includes("signin")) {
        toastr.error(
          "",
          res.data.exception ? res.data.exception : res.data.stringResult ? res.data.stringResult : "Please enter valid username and password"
        );
      }
      else {
        toastr.error(
          "",
          res.data.exception ? res.data.exception : res.data.stringResult ? res.data.stringResult : "Your session expired. Please login again"
        );
        sessionStorage.clear();
      }
    } else if (res.data.statusCode === StatusCodes.Error)
      toastr.error("", res.data.exception ? res.data.exception : res.data.stringResult ? res.data.stringResult : "Something went wrong");
    else response = true;
  } else response = true;

  return response;
}