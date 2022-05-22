/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
export const EmailRegex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PhoneRegex = /^(0 (\d{3}) (\d{3}) (\d{2}) (\d{2}))$/;

export const DecimalRegex = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;

export const PositiveDecimalRegex = /^([0-9]+\.?[0-9]*|\.[0-9]+)$/;

export const CardNoRegex = /^((\d{4}) (\d{4}) (\d{4}) (\d{4}))$/;

export const IbanNoRegex = /^((\d{2}) (\d{4}) (\d{4}) (\d{4}) (\d{4}) (\d{4}) (\d{2}))$/;

export const AccountNoRegex = /^((\d{4})-(\d{6}))$/;
