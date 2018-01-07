# -*- coding: utf-8 -*-

from datetime import datetime

import lib.const as const
import lib.mosaic as mosaic
import lib.targetdate as targetdate
import lib.thanks_point as tpoint

if __name__ == '__main__':
    current_date = datetime.now().date()
    # get target date
    starting_date = targetdate.get_starting_date(const.TERM, current_date)

    # get date range
    end_date = targetdate.get_end_date(starting_date, const.TERM)

    # calculate point each user
    user_points = tpoint.calculate_thanks_points(starting_date, end_date)

    # send mosaic
    for address, point in user_points.items():
        # TODO; insert in large quantity post
        result = mosaic.send_mosaic(const.OWNER_ADDRESS, address, point)

    targetdate.save(starting_date)
