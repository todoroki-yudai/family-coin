# -*- coding: utf-8 -*-

import logging
import pytest
from io import StringIO

logger = logging.getLogger(__file__)


@pytest.fixture(scope='function', autouse=True)
def scope_function_logger():
    original_logger = logger
    stream = StringIO()
    log_handler = logging.StreamHandler(stream)
    original_logger.setLevel(logging.INFO)
    for handler in original_logger.handlers:
        original_logger.removeHandler(handler)
    original_logger.addHandler(log_handler)

    yield(log_handler, stream, logger)

    original_logger.removeHandler(log_handler)
    log_handler.close()
