import axios from 'axios';

const CRM_URL = process.env.CRM_URL || '';

export const crmGet = async (path: string, token: string) => {
  const { data } = await axios.get(`${CRM_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const crmPost = async (path: string, token: string, body: any) => {
  const { data } = await axios.post(`${CRM_URL}${path}`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
