# -*- coding: utf-8 -*-

import lib.api as api
import lib.const as const


def send_mosaic(sender_address, receiver_address, point):
    if sender_address == receiver_address:
        return None
    url = '{}{}'.format(const.API_BASE_URL, '/thanks/send')
    header = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': sender_address
    }
    body = {
        'received_address': receiver_address,
        'amount': point,
        'message': 'thanks point',
        'usemosaic': 'false',  # TODO: use config
    }
    response = api.call_post_api(url, body=body, header=header)
    print(response)
    return response
