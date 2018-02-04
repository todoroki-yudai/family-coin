# -*- coding: utf-8 -*-

from collections import defaultdict
import json

import lib.api as api
import lib.const as const


def _get_total_send_point(start_date, end_date):
    """Sum user's send point"""
    user_points = {}
    transactions = _find_transactions(start_date, end_date)
    for transaction in transactions:
        if transaction['sender_address'] not in user_points:
            user_points[transaction['sender_address']] = 0
        user_points[transaction['sender_address']] += transaction['amount']
    return user_points


def _find_transactions(start_date, end_date, user=None):
    url = '{}{}'.format(const.API_BASE_URL, '/thanks/transactions/')
    body = {
        'start_date': start_date.strftime('%Y-%m-%d'),
        'end_date': end_date.strftime('%Y-%m-%d')
    }
    header = {
        'token': 'aaa'  # FIXME: add address
    }
    response = api.call_get_api(url, body=body, header=header)
    return json.loads(response.text)


def _get_most_balances(start_date, end_date):
    """Get the highest balance"""
    user_balances = {}
    balances = _find_balances(start_date, end_date)
    for balance in balances:
        if balance['address'] not in user_balances:
            user_balances[balance['address']] = \
                float(balance['balance']) * const.ADJUST_THANKS_POINT_RATE
        else:
            if user_balances[balance['address']] < balance['balance']:
                user_balances[balance['address']] = \
                    float(balance['balance']) * const.ADJUST_THANKS_POINT_RATE
    return user_balances


def _find_balances(start_date=None, end_date=None):
    url = '{}{}'.format(const.API_BASE_URL, '/users/balances/')
    body = {}
    if start_date:
        body['start_date'] = start_date.strftime('%Y-%m-%d')
    if end_date:
        body['end_date'] = end_date.strftime('%Y-%m-%d')
    header = {
        'token': 'aaa'  # FIXME: add address
    }
    response = api.call_get_api(url, body=body, header=header)
    return json.loads(response.text)


def _find_latest_balances():
    url = '{}{}'.format(const.API_BASE_URL, '/users/balances/latest')
    body = {}
    header = {
        'token': 'aaa'  # FIXME: add address
    }
    response = api.call_get_api(url, body=body, header=header)
    return json.loads(response.text)


def calculate_depreciation_points():
    user_balances = {}
    balances = _find_latest_balances()
    for balance in balances:
        user_balances[balance['address']] = \
            float(balance['balance']) * const.DEPRECIATION_RATE
    return user_balances


def calculate_thanks_points(start_date, end_date):
    def merge_dict_values(*dicts):
        r = defaultdict(set)
        for d in dicts:
            for k, v in d.items():
                r[k].add(v)
        return r

    send_points = _get_total_send_point(start_date, end_date)
    most_balances = _get_most_balances(start_date, end_date)
    dic_merged = merge_dict_values(send_points, most_balances)
    dic_rev = {address: min(v) for address, v in dic_merged.items()}

    # remove owner point
    if const.OWNER_ADDRESS in dic_rev:
        del dic_rev[const.OWNER_ADDRESS]

    return dic_rev
