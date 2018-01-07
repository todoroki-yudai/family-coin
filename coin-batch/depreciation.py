# -*- coding: utf-8 -*-

import lib.mosaic as mosaic
import lib.thanks_point as tpoint

if __name__ == '__main__':
    # calculate depreciation amount
    depreciation_points = tpoint.calculate_depreciation_points()
    # send mosaic
    for address, point in depreciation_points.items():
        # TODO; insert in large quantity post
        mosaic.send_mosaic(address, point)
