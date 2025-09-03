import axios from "axios";

const BASE_URL = "http://localhost:5181/api"; // Common base

// ----------------- Admin Profiles -----------------
const ADMIN_URL = `${BASE_URL}/AdminProfiles`;

export const getAllAdminProfiles = async ( ) => axios.get(ADMIN_URL);
export const getAdminProfileById = async (id) => axios.get(`${ADMIN_URL}/${id}`);
export const createAdminProfile = async (profile) => axios.post(ADMIN_URL, profile);
export const updateAdminProfile = async (id, profile) => axios.put(`${ADMIN_URL}/${id}`, profile);
export const deleteAdminProfile = async (id) => axios.delete(`${ADMIN_URL}/${id}`);

// ----------------- Donors -----------------
const DONOR_URL = `${BASE_URL}/Donors`;

export const getDonors = async () => axios.get(DONOR_URL);
export const getDonorById = async (id) => axios.get(`${DONOR_URL}/${id}`);
export const createDonor = async (donor) => axios.post(DONOR_URL, donor);
export const updateDonor = async (id, donor) => axios.put(`${DONOR_URL}/${id}`, donor);
export const deleteDonor = async (id) => axios.delete(`${DONOR_URL}/${id}`);

// ----------------- Receivers -----------------
const RECEIVER_URL = `${BASE_URL}/Receivers`;

export const getReceivers = async () => axios.get(RECEIVER_URL);
export const getReceiverById = async (id) => axios.get(`${RECEIVER_URL}/${id}`);
export const createReceiver = async (receiver) => axios.post(RECEIVER_URL, receiver);
export const updateReceiver = async (id, receiver) => axios.put(`${RECEIVER_URL}/${id}`, receiver);
export const deleteReceiver = async (id) => axios.delete(`${RECEIVER_URL}/${id}`);
