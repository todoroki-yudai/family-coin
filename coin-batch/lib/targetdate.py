# -*- coding: utf-8 -*-

import datetime
from datetime import datetime as dt
import os

TARGET_DATE_FILE = 'target_date.txt'


def _write_target_date(target_date):
    f = open(TARGET_DATE_FILE, 'w')
    f.write('{}\n'.format(target_date.strftime('%Y-%m-%d')))
    f.close()


def _get_target_date_from_file(term, current_date):
    with open(TARGET_DATE_FILE, 'r') as f:
        value = f.readlines()[0]
        if value:
            # TODO: validate date format
            tdatetime = dt.strptime(
                value.strip(), '%Y-%m-%d')
            if (tdatetime + datetime.timedelta(days=term)).date() \
                    < current_date:
                _write_target_date(current_date)
                return current_date
            return datetime.date(
                tdatetime.year, tdatetime.month, tdatetime.day)
        return current_date


def get_starting_date(
        term,
        current_date=dt.today()):
    try:
        # TODO: get from db
        if os.path.exists(TARGET_DATE_FILE):
            return _get_target_date_from_file(term, current_date)
        _write_target_date(current_date)
        return current_date
    except Exception as e:
        print(e)
        raise e


def get_end_date(starting_date, term):
    return starting_date + datetime.timedelta(days=term)


def save(end_date, current_date=dt.today()):
    if end_date.strftime('%Y-%m-%d') < current_date.strftime('%Y-%m-%d'):
        _write_target_date(current_date)
