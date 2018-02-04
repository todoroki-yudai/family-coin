# -*- coding: utf-8 -*-

import datetime
import json

import lib.api as api
import lib.const as const


def get_target_term(target_date):
    if not target_date or not isinstance(target_date, datetime.date):
        raise Exception('target_date != datetime.datetime objects')
    return _get_target_term(target_date, 'specify')


def get_latest():
    return _get_target_term(None, 'latest')


def _get_target_term(target_date, typestr):
    url = '{}{}'.format(const.API_BASE_URL, '/thanks/term')
    body = {
        'type': typestr,
    }
    if target_date:
        body['target_date'] = target_date.strftime('%Y-%m-%d')
    header = {
        'token': 'aaa'  # FIXME: add address
    }
    response = api.call_get_api(url, body=body, header=header)
    return json.loads(response.text)


def save_target_term(start_date, end_date):
    if not start_date or not end_date:
        raise Exception('start_date, end_date is required')

    if not isinstance(start_date, datetime.date) \
       or not isinstance(end_date, datetime.date):
        raise Exception('start_date, end_date is required datetime object')

    url = '{}{}'.format(const.API_BASE_URL, '/thanks/term')
    header = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': 'aaa'  # FIXME: add address
    }
    body = {
        'start_date': start_date.strftime('%Y-%m-%d'),
        'end_date': end_date.strftime('%Y-%m-%d'),
        'is_sent': 'false'
    }
    response = api.call_post_api(url, body=body, header=header)
    print(response)
    return response


def mark_sent(dataid):
    if not dataid:
        raise Exception('dataid is required')

    url = '{}{}'.format(const.API_BASE_URL, '/thanks/term')
    header = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': 'aaa'  # FIXME: add address
    }
    body = {
        'id': dataid,
        'is_sent': 'true'
    }
    response = api.call_post_api(url, body=body, header=header)
    print(response)
    return response
