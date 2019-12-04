import { stringify } from 'qs';
import { extend } from 'umi-request';

const request = extend()

export async function fetchMapDetail(params) {
  return request(`/api/map/detail`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function saveMapDetail(params) {
  return request(`/api/map/save`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
