# -*- coding: utf-8 -*-

import lib.api as api
import lib.const as const


def send_mosaic(address, point):
    if const.OWNER_ADDRESS == address:
        return None
    url = '{}{}'.format(const.API_BASE_URL, '/thanks/send')
    header = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': const.OWNER_ADDRESS
    }
    body = {
        'received_address': address,
        'amount': point,
        'message': 'thanks point',
        'usemosaic': 'false',  # TODO: use config
    }
    response = api.call_post_api(url, body=body, header=header)
    print(response)
    return response
