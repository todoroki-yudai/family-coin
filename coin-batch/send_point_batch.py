# -*- coding: utf-8 -*-
#
# Send Thanks point to users after calculating

import datetime as dt
from datetime import datetime
import logging

import lib.const as const
import lib.mosaic as mosaic
import lib.target_term as target_term
import lib.thanks_point as tpoint


class SendPoint(object):

    def __init__(self, logger=None):
        self.logger = logger if logger else logging.getLogger(__file__)

    def _send_mosaic(self, term):
        # calculate point each use
        user_points = tpoint.calculate_thanks_points(
            term['start_date'], term['end_date'])

        # send mosaic
        for address, point in user_points.items():
            # TODO; insert in large quantity post
            # TODO: prevent duplicate sent when stop in the middle.
            #       If you already send money within 23 hours 59minute, do nothing
            mosaic.send_mosaic(const.OWNER_ADDRESS, address, point)
            self.logger.info('send mosaic {} to {} '.format(point, address))

    def send_point(self, current_date):
        # TODO: check duplicate run
        # if during the period current_date, send mosaic, create target date
        try:
            term = target_term.get_target_term(current_date)
            if not term:
                # if previous data exists, send mosaic to user
                latest_term = target_term.get_latest()
                if latest_term:
                    # send mosaic
                    if latest_term['is_sent'] == 'false':
                        self._send_mosaic(latest_term)

                    # target_term.save(start_date)
                    target_term.mark_sent(latest_term['id'])

                    # create new target term
                    tdatetime = datetime.strptime(
                        latest_term['end_date'], '%Y-%m-%d')
                    start_date = tdatetime + dt.timedelta(days=1)
                    end_date = start_date + dt.timedelta(days=const.TERM)
                    target_term.save_target_term(start_date, end_date)
                    self.logger.info('create target term {} to {} '.format(
                        start_date, end_date))
                else:
                    # create new target term
                    start_date = current_date
                    end_date = start_date + dt.timedelta(days=const.TERM)
                    target_term.save_target_term(start_date, end_date)
                    self.logger.info('create first target term {} to {} '.format(
                        start_date, end_date))
            else:
                self.logger.info(
                    'pass send point. during the period. start = {}, target = {}, end = {}'.format(
                        term['start_date'],
                        current_date.strftime('%Y-%m-%d'),
                        term['end_date'],
                    )
                )
        except Exception as err:
            self.logger.exception('Error occured: %s', err)
            raise err


if __name__ == '__main__':
    logger = logging.getLogger(__file__)
    send_point = SendPoint(logger)
    send_point.send_point(datetime.now().date())
