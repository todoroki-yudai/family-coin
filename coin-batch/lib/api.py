# -*- coding: utf-8 -*-

import pprint
import requests
import urllib


def call_get_api(url, body={}, header={}):
    # urllib.urlencodeは unicodeを処理できないのでstrで渡すこと
    query_string = urllib.parse.urlencode(body)
    print('{}?{}'.format(url, query_string))
    response = requests.get('{}?{}'.format(url, query_string),
                            headers=header
                            )

    if response.status_code != 200:
        raise Exception('HTTP Error {} at {}: {}'.format(
                        response.status_code, url, response.text))
    pprint.pprint(response)
    return response


def call_post_api(url, body={}, header={}):
    response = requests.post(
        url,
        body,
        headers=header
    )

    if response.status_code != 200:
        raise Exception('HTTP Error {} at {}: {}'.format(
                        response.status_code, url, response.text))

    pprint.pprint(response)
    return response
