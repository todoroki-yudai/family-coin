# coding: utf-8

from datetime import datetime
import pytest
from unittest.mock import MagicMock, patch

import lib.api as api
import lib.mosaic as mosaic
from send_point_batch import SendPoint


class DummyResponse:
    status_code = 200
    text = '[]'


class TestSnedPointBatch:

    @patch('lib.api.call_post_api', return_value={})
    @patch('lib.api.call_get_api', return_value=DummyResponse)
    def test_noexist_target_term(self, post, get, scope_function_logger):
        """Check if target file exists"""
        today = datetime.now().date()

        # execute
        SendPoint(scope_function_logger[2]).send_point(today)
        scope_function_logger[0].flush()
        assert u'create first target term' in \
            scope_function_logger[1].getvalue().rstrip()

    @patch('lib.target_term._get_target_term', return_value={
        "id": 1,
        "start_date": "2018-01-29T10:52:55.973Z",
        "end_date": "2018-02-20T10:52:55.973Z",
        "is_sent": "false"
    })
    def test_during_period(self, a, scope_function_logger):
        """Do nothing"""
        today = datetime.now().date()

        # execute
        SendPoint(scope_function_logger[2]).send_point(today)
        scope_function_logger[0].flush()
        assert u'pass send point' in \
            scope_function_logger[1].getvalue().rstrip()

    @patch('lib.api.call_post_api', return_value={})
    @patch('lib.thanks_point._find_transactions', return_value=[
      {
        "sender_address": "string",
        "receiver_address": "string",
        "amount": 1,
        "message": "string",
        "created_at": "2018-01-29T10:48:05.481Z"
      }
    ])
    @patch('lib.thanks_point._find_balances', return_value=[{
        "id": 1,
        "address": "string",
        "balance": 1,
        "created_at": "2018-01-29T10:52:55.973Z"
    }])
    @patch('lib.target_term.get_target_term', return_value={})
    @patch('lib.target_term.get_latest', return_value={
        "id": 1,
        "start_date": "2018-01-29",
        "end_date": "2018-02-20",
        "is_sent": "false"
    })
    def test_past_during_period(self, a, b, c, d, e, scope_function_logger):
        """Send thanks point"""
        today = datetime.strptime('2017-02-21', '%Y-%m-%d')

        # execute
        SendPoint(scope_function_logger[2]).send_point(today)
        scope_function_logger[0].flush()
        output = scope_function_logger[1].getvalue().rstrip()
        assert u'send mosaic' in output
        assert u'create target term' in output

    @patch('lib.api.call_post_api', MagicMock(side_effect=api.ApiException()))
    @patch('lib.thanks_point._find_transactions', return_value=[
      {
        "sender_address": "string",
        "receiver_address": "string",
        "amount": 1,
        "message": "string",
        "created_at": "2018-01-29T10:48:05.481Z"
      }
    ])
    @patch('lib.thanks_point._find_balances', return_value=[{
        "id": 1,
        "address": "string",
        "balance": 1,
        "created_at": "2018-01-29T10:52:55.973Z"
    }])
    @patch('lib.target_term.get_target_term', return_value={})
    @patch('lib.target_term.get_latest', return_value={
        "id": 1,
        "start_date": "2018-01-29",
        "end_date": "2018-02-20",
        "is_sent": "false"
    })
    def test_insufficient_owner_funds(self, a, b, c, d, scope_function_logger):
        """Owner mosaic is insufficient to send thanks point"""
        with pytest.raises(mosaic.MosaicException):
            SendPoint(scope_function_logger[2]).send_point(
                datetime.now().date())

    @patch('lib.api.call_post_api', return_value={})
    @patch('lib.thanks_point._find_transactions', return_value=[
      {
        "sender_address": "string",
        "receiver_address": "string",
        "amount": 1,
        "message": "string",
        "created_at": "2018-01-29T10:48:05.481Z"
      }
    ])
    @patch('lib.thanks_point._find_balances', return_value=[{
        "id": 1,
        "address": "string",
        "balance": 1,
        "created_at": "2018-01-29T10:52:55.973Z"
    }])
    @patch('lib.target_term.get_target_term', return_value={})
    @patch('lib.target_term.get_latest', return_value={
        "id": 1,
        "start_date": "2018-01-29",
        "end_date": "2018-02-20",
        "is_sent": "true"
    })
    def test_run_same_target_day(self, a, b, c, d, e, scope_function_logger):
        """Do nothing on the same day"""
        today = datetime.strptime('2017-02-21', '%Y-%m-%d')

        # execute
        SendPoint(scope_function_logger[2]).send_point(today)
        scope_function_logger[0].flush()
        output = scope_function_logger[1].getvalue().rstrip()
        assert u'send mosaic' not in output
        assert u'create target term' in output

    def test_multiple_runs(self):
        """Do nothing when multiple starts"""
        # TODO: implement
        pass
